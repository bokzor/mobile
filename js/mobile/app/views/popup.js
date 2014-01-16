app.Views.PopupView = Backbone.View.extend({
    id: 'myPopover',
    className: 'popover',
    template: _.template('<header class="popover-header">' +
        '<a id="fermer-pop" class="button">Annuler</a>' +
        '<h3 class="title"><%= titre %></h3>' +
        '<a id="<%= callback %>" class="button" >Ok</a>' +
        '</header> <%= contenu %>'),

    templateCommanderTableId: _.template('<ul class="list"><li><input type="number" placeholder="Numéro de table"></li></ul>'),

    templateCommanderOptions: _.template(
        '<ul class="list"><li><a id="commander-tableId">Numéro de table</a></li>' +
        '<li><a id="commander-scan" >Scanner le QR code</a></li></ul>'),

    templateEncaisser: _.template('<ul class="list"><li><a data-type="-1" id="encaisser-cash">Cash</a></li>' +
        '<li><a id="encaisser-bancontact" data-type="-2" >Bancontact</a></li>' +
        '<li><a id="encaisser-offrir" data-type="-3">Offrir</a></li>'),

    templateCharger: _.template('<ul class="list"><li><input type="number" placeholder="Numéro de table"></li></ul>'),

    templateOptionsCommande: _.template('<ul class="list">' +
        '<li><input data-id="<%= id %>" type="number" placeholder="Nombre d\'articles"></li>' +
        '<li>Ajouter un commentaire <textarea id="comment"></textarea></ul>'),


    events: {
        "click #fermer-pop": "close",
        "click #valider-action-charger": "chargerOk",
        "click #valider-action-commander": "commanderOk",
        "click #encaisser-cash": "encaisserOk",
        "click #encaisser-offrir": "encaisserOk",
        "click #encaisser-bancontact": "encaisserOk",
        "click #commander-tableId": "commanderTableId",
        "click #commander-scan": "commanderScan",
        "click #valider-options": "optionsOk",

    },

    commanderTableId: function() {
        var options = {
            callback: 'valider-action-commander',
            contenu: this.templateCommanderTableId(),
            titre: '',

        };
        this.$el.html(this.template(options));
        $('#content').prepend(this.el);
        this.$el.find('input').focus();
    },
    optionsCommande: function(id) {
        console.log(id);
        var object = new Array();
        object['id'] = id;
        var options = {
            callback: 'valider-options',
            contenu: this.templateOptionsCommande(object),
            titre: '',
        };
        this.$el.html(this.template(options));
        $('#content').prepend(this.el);
        this.$el.find('input').focus();
    },
    optionsOk: function() {
        var id = this.$el.find('input').data('id');
        var count = this.$el.find('input').val();
        var comment = this.$el.find('textarea').val();
        var options = new Array();
        options['comment'] = comment;
        options['count'] = count;
        options['id'] = id;
        app.collections.commande.addArticleOptions(options);
        this.close();
    },
    commanderScan: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan(function(result) {
            app.collections.commande.enregister(result.text);
        }, function(error) {
            // notif scan failed.
            this.commanderTableId();
            console.log("Scanning failed: ", error);
        });

        this.close();
    },
    commanderOptions: function() {
        if (app.infos.get('commandeId') !== -1) {
            app.collections.commande.modifier();
        } else {
            var options = {
                callback: '',
                titre: '',
                contenu: this.templateCommanderOptions()
            };
            this.$el.html(this.template(options));
            $('#content').prepend(this.el);
            this.$el.find('input').focus();
        }
    },

    encaisser: function() {
        var options = {
            callback: '',
            contenu: this.templateEncaisser(),
            titre: '',

        };
        this.$el.html(this.template(options));
        $('#content').prepend(this.el);
    },

    charger: function() {
        var options = {
            callback: 'valider-action-charger',
            contenu: this.templateCharger(),
            titre: '',

        };
        this.$el.html(this.template(options));
        $('#content').prepend(this.el);
        this.$el.find('input').focus();
    },
    close: function() {
        console.log('close popup');
        this.remove();
    },
    chargerOk: function() {
        var input = this.$el.find('input');
        app.collections.commande.chargerTable(input.val());
        app.snapper.open('right');
        this.close();
    },
    commanderOk: function() {
        var input = this.$el.find('input');
        // pas de table id ni de commande , ca veut dire que c'est une nouvelle commande et pas une modif
        if (app.infos.get('commandeId') === -1) {
            app.collections.commande.enregister(input.val());
        }
        this.close();
    },
    encaisserOk: function(e) {
        var type = $(e.target).data('type');
        console.log(type);
        app.collections.commande.encaisser(type);
        this.close();
    },

});