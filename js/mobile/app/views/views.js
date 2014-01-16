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
    },
    events: {
        'tap a': 'addArticle',
        'longTap a': 'options'
    },
    options: function(e) {
        app.snapper.close();
        var id = $(e.currentTarget).data("id_article");
        new app.Views.PopupView().optionsCommande(id);

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
        '<div class="tab-label"><% if(app.infos.get("commandeId")=== -1){%>Commander<% } else { %>Modifier<% } %></div>' +
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
        if (app.collections.commande.length === 0) {
            app.snapper.close();
        }
        app.infos.annuler();
    },
    render: function() {
        this.$el.html(this.barreAction());
    },
    initialize: function() {
        this.render();
        $('body').append(this.$el);
    },
    commander: function() {
        app.snapper.close();
        new app.Views.PopupView().commanderOptions();
    },
    encaisser: function() {
        app.snapper.close();
        new app.Views.PopupView().encaisser();
    },
    charger: function() {
        app.snapper.close();
        new app.Views.PopupView().charger();
    },
})