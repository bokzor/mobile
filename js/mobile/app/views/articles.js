// s'occupe d'afficher la liste des articles
app.Views.ArticlesView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list articles',

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
        $('#content').append(this.$el);

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
        $('#content').append(this.$el);
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