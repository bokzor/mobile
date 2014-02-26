app.Views.PopupView = Backbone.View.extend({
    id: 'myPopover',
    className: 'popover',

    initialize: function() {
        if (typeof(app.views.popup) === 'object') {
            app.views.popup.remove();
        }
    },
    template: _.template('<header class="popover-header">' +
        '<a id="fermer-pop" class="button">Annuler</a>' +
        '<h3 class="title"><%= titre %></h3>' +
        '<a id="<%= callback %>" class="button" >Ok</a>' +
        '</header> <%= contenu %>'),

    templateCharger: _.template('<ul class="list">' +
        '<li><a id="charger-client">Commandes d\'un client</a></li>' +
        '<li><a id="charger-table">Commandes d\'une table</a></li></ul>'),

    templateChargerTable: _.template('<ul class="list">' +
        '<li><input type="number" placeholder="Numéro de table"></li>' +
        '<li><a id="charger-table-qr">Scanner le QR code</a></li></ul>'),

    templateChargerClient: _.template('<ul class="list">' +
        '<li><a id="recherche-client">Recherche client</a></li>' +
        '<li><a id="charger-client-qr">Scanner le QR code</a></li></ul>'),

    templateCommanderTableId: _.template('<ul class="list"><li><input type="number" placeholder="Numéro de table"></li></ul>'),

    // commander par qr code ou table id
    templateCommanderOptions: _.template(
        '<ul class="list"><li><a id="commander-tableId">Numéro de table</a></li>' +
        '<li><a id="commander-scan" >Scanner le QR code</a></li></ul>'),

    // template qui offre les options pour encaisser la commande
    templateEncaisser: _.template('<ul class="list"><li><a data-type="-1" id="encaisser-cash">Cash</a></li>' +
        '<li><a id="encaisser-bancontact" data-type="-2" >Bancontact</a></li>' +
        '<li><a id="encaisser-offrir" data-type="-3">Offrir</a></li>'),

    templateOptionsCommande: _.template('<ul class="list">' +
        '<li><input data-id="<%= id %>" type="number" placeholder="Nombre d\'articles"></li>' +
        '<li>Ajouter un commentaire <textarea id="comment"></textarea></ul>'),


    events: {
        "click #fermer-pop": "close",

        "click #charger-client": "chargerClient",

        "click #charger-table": "chargerTable",
        "clicl #charger-table-qr": "chargerTableQR",
        "click #valider-charger-table": "chargerTableOk",
        "click #charger-client-qr": "chargerClientQR",
        "click #recherche-client": "chargerClientRecheche",

        "click #valider-action-commander": "commanderOk",
        "click #encaisser-cash": "encaisserOk",
        "click #encaisser-offrir": "encaisserOk",
        "click #encaisser-bancontact": "encaisserOk",
        "click #encaisser-qr": "encaisserQR",
        "click #commander-tableId": "commanderTableId",
        "click #commander-scan": "commanderScan",
        "click #valider-options": "optionsOk",

    },
    // affiche un choix entre table ou client
    charger: function() {
        var options = {
            callback: '',
            contenu: this.templateCharger(),
            titre: '',

        };
        this.$el.html(this.template(options));
        $('#content').after(this.el);
        this.$el.find('input').focus();
    },
    // affiche un choix entre qr code et numéro de table
    chargerTable: function() {
        var options = {
            callback: 'valider-charger-table',
            contenu: this.templateChargerTable(),
            titre: '',
        };
        this.$el.html(this.template(options));
        $('#content').after(this.el);
        this.$el.find('input').focus();
    },
    // valide l'input de la table
    chargerTableOk: function() {
        var input = this.$el.find('input');
        app.collections.commande.chargerTable(input.val());
        app.snapper.open('right');
        this.close();
    },
    // valide le qr code de la table
    chargerTableQR: function() {
        scanner.scan(function(result) {
            app.collections.commande.chargerTable(result.text);
            app.snapper.open('right');
        }, function(error) {
            alert('Echec du scan');
            console.log("Scanning failed: ", error);
        });
        this.close();
    },
    chargerClient: function() {
        var options = {
            callback: 'valider-charger-client',
            contenu: this.templateChargerClient(),
            titre: '',
        };
        this.$el.html(this.template(options));
        $('#content').after(this.el);
        this.$el.find('input').focus();
    },
    // valide le qr code de la table

    chargerClientQR: function() {
        scanner.scan(function(result) {
            var infos = new Array();
            infos['hash'] = result.text;
            app.collections.commande.chargerClient(infos);
            app.snapper.open('right');
        }, function(error) {
            alert('Echec du scan');
            console.log("Scanning failed: ", error);
        });
        this.close();
    },
    chargerClientRecheche: function() {
        this.close();
        console.log('recherche d\'un client');
        app.routes.navigate('client', {
            trigger: true,
            replace: true
        });
    },

    commanderTableId: function() {
        var options = {
            callback: 'valider-action-commander',
            contenu: this.templateCommanderTableId(),
            titre: '',

        };
        this.$el.html(this.template(options));
        $('#content').after(this.el);
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
        $('#content').after(this.el);
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
            $('#content').after(this.el);
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
        $('#content').after(this.el);
    },


    encaisserQR: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan(function(result) {
            app.collections.commande.enregister(result.text);
        }, function(error) {
            // notif scan failed.
            app.collections.commande.encaisser(type);
            console.log("Scanning failed: ", error);
        });

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

    close: function() {
        console.log('close popup');
        this.remove();
    },

});