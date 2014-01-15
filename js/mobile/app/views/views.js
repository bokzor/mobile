// s'occupe de l'affichage de la listes des categories. Revoir le cas des sous sous catégories




app.Views.CatsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',
    levelFilter: function(model) {
        // on revoit les categories de niveau 0
        if (this.attributes.level === 0)
            return model.attributes.level === this.attributes.level;
        else {
            // on revoit les cate de niveau superieur en verifiant le parrent
            return model.attributes.level === this.attributes.level && model.attributes.root_id === this.attributes.root_id;
        }
    },
    template: _.template('<%= name %>'),
    // on rajoute les catégories a la liste qui va être affichée
    addOne: function(category) {
        if (category)
            var catView = new app.Views.CatView({
                model: category
            });
        this.$el.append(catView.render().el);
    },
    events: {
        // bouton retour
        'click #back': 'goBack'
    },

    // on affiche la liste html contenu dans el
    render: function() {
        this.$el.empty();
        // si on est pas au niveau 0 on affiche un bouton retour
        if (this.attributes.level > 0) {
            var back = $('<li id="back">Retour</li>');
            this.$el.append(back);
        }
        // on filtre la collection et on append chaque categorie dans le html
        this.collection.filter(this.levelFilter, this).forEach(this.addOne, this);
        $('.content').html(this.$el);
    },
    // on affiche les catégories de départ
    goBack: function() {
        this.attributes['level'] = 0;
        this.render();
    },
    initialize: function() {
        app.views.modal = new app.Views.ModalView();
    }
});


// s'occupe de l'affichage d'une seule catégorie
app.Views.CatView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<a data-id="<%= id %>"> <%= name %><span class="chevron"></span></a>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        "click a": "deeper",
    },
    deeper: function(e) {
        var id = $(e.currentTarget).data("id");
        var model = app.collections.categories.get(id);
        // si on click sur une cat on passe au niveau supérieur
        app.views.cats.attributes['level'] = model.get('level') + 1;
        app.views.cats.attributes['root_id'] = id;
        // on affiche la listes des catégories
        app.views.cats.render();
        app.views.articles.attributes['cat_id'] = id;
        app.views.articles.render();

    }
});


// s'occupe d'afficher la liste des articles
app.Views.ArticlesView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    filter: function(model) {
        // on revoit articles correspondant a la catégories
        if (this.attributes.cat_id !== 0) {
            return model.attributes.category_id === this.attributes.cat_id;
        }
        // sinon on renvoit les articles de la recherche
        else if (this.attributes.recherche !== '') {
            if (model.attributes.name.toLowerCase().indexOf(this.attributes.recherche.toLowerCase()) !== -1) {
                return true;
            }
        }

    },
    recherche: function(model) {
        this.$el.empty();
        if (this.attributes.recherche !== '') {
            this.collection.filter(this.filter, this).slice(0, 20).forEach(this.addOne, this);
            app.views.cats.$el.empty();
        } else {
            app.views.cats.attributes['level'] = 0;
            app.views.cats.render();
        }
        $('.content').append(this.$el);

    },
    addOne: function(article) {
        var articleView = new app.Views.ArticleView({
            model: article
        });
        this.$el.append(articleView.render().el);
        console.log('on ajouter un article a la liste');
    },
    render: function() {
        this.$el.empty();
        this.collection.filter(this.filter, this).forEach(this.addOne, this);
        $('.content').append(this.$el);
    }
});





app.Views.ArticleView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<a data-id_article="<%= id_article %>"> <%= name %><span class="count"><%= prix %></span></a>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function() {
        // tab pour touch click pour desktop
        //this.$el.on('click', 'a', this.addArticle);
    },
    events: {
        'click a': 'addArticle'
    },
    addArticle: function(e) {
        var id = $(e.currentTarget).data("id_article");
        app.collections.commande.addArticleId(id);

    }
});





app.Views.BarreActionView = Backbone.View.extend({
    tagName: 'nav',
    id: 'barre-action',
    className: 'bar-tab',
    barreAction: _.template('<ul class="tab-inner">' +
        '<li class="tab-item">' +
        '<a id="encaisser-action">' +
        '<i class="tab-icon icon-money"></i>' +
        '<div class="tab-label">Encaisser</div>' +
        '</a>' +
        '</li>' +
        '<li  class="tab-item">' +
        '<a id="commander-action">' +
        '<i class="tab-icon icon-ok"></i>' +
        '<div class="tab-label">Commander</div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="charger-action">' +
        '<i class="tab-icon icon-download"></i>' +
        '<div class="tab-label">Charger</div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="annuler-action">' +
        '<i class="tab-icon icon-cancel"></i>' +
        '<div class="tab-label">Annuler</div>' +
        '</a>' +
        '</li>' +
        '</ul>'),
    events: {
        "click #encaisser-action": "encaisser",
        "click #charger-action": "charger",
        "click #annuler-action": "annuler",
        "click #commander-action": "commander",
    },
    annuler: function() {
        app.infos.annuler();
    },
    render: function() {
        this.$el.html(this.barreAction());
        $('body').append(this.$el);
    },
    initialize: function() {
        this.render();
    },
    commander: function() {
        new app.Views.ModalView().commanderOptions();

    },
    encaisser: function() {
        new app.Views.ModalView().encaisser();
    },
    charger: function() {
        new app.Views.ModalView().charger();
    },
})



app.Views.ModalView = Backbone.View.extend({
    className: 'modal active',
    templateCommanderTableId: _.template('<div><input type="number" placeholder="Numéro de table">' +
        '<a id="valider-action-commander" class="button button-block">Valider</a>' +
        '<a id="fermer-modale" class="button button-block">Annuler</a></div>'),

    templateCommanderOptions: _.template(
        '<div><a id="commander-tableId" class="button button-block">Numéro de table</a>' +
        '<a id="commander-scan" class="button button-block">Scanner le code</a>' +
        '<a id="fermer-modale" class="button button-block">Annuler</a></div>'),


    templateEncaisser: _.template('<div><a data-type="-1" id="encaisser-cash" class="button button-block">Cash</a> ' +
        '<a id="encaisser-bancontact" data-type="-2" class="button button-block">Bancontact</a>' +
        '<a id="encaisser-offrir" data-type="-3" class="button button-block">Offrir</a>' +
        '<a id="fermer-modale" class="button button-block">Annuler</a></div>'),

    templateCharger: _.template('<div><input type="number" placeholder="Numéro de table">' +
        '<a id="valider-action-charger" class="button button-block">Valider</a>' +
        '<a id="fermer-modale" class="button button-block">Annuler</a></div>'),

    events: {
        "click #fermer-modale": "close",
        "click #valider-action-charger": "chargerOk",
        "click #valider-action-commander": "commanderOk",
        "click #encaisser-cash": "encaisserOk",
        "click #encaisser-offrir": "encaisserOk",
        "click #encaisser-bancontact": "encaisserOk",
        "click #commander-tableId": "commanderTableId",
        "click #commander-scan": "commanderScan",


    },

    commanderTableId: function() {
        this.$el.html(this.templateCommanderTableId());
        $('#content').after(this.el);
        this.$el.find('input').focus();
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
            this.$el.html(this.templateCommanderOptions());
            $('#content').after(this.el);
            this.$el.find('input').focus();
        }
    },
    encaisser: function() {
        this.$el.html(this.templateEncaisser());
        $('#content').after(this.el);
    },
    charger: function(e) {
        this.$el.html(this.templateCharger());
        $('#content').after(this.el);
        var input = this.$el.find('input');
        input.focus();
    },
    render: function() {
        this.$el.toggleClass('active');
    },
    close: function() {
        console.log('close modal');
        this.$el.toggleClass('active');
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

    }
})