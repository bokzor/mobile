app.Views.Commande = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',
    count: 0,
    total: 0,
    addOne: function(articleCommande) {
        var articleView = new app.Views.ArticlesCommandeView({
            model: articleCommande
        });
        this.$el.append(articleView.render().el);
        // on incremente le nombre d'article
        this.count += articleCommande.get('count');
        this.total += articleCommande.get('count') * articleCommande.get('prix');
    },
    events: {
        "click #supprimer-article": 'deleteArticle',
    },
    render: function() {
        this.count = 0;
        this.total = 0;

        this.$el.empty();
        // on ajoute un a un les articles
        this.collection.forEach(this.addOne, this);
        this.$el.append('<li class="list-divider">Total : <span class="count">' + this.total + '</span></li><li><a id="supprimer-article">Supprimer</a></li>');
        $('#count-basket').html(this.count);

    },
    initialize: function() {
        this.render();
        this.collection.on('add', this.render, this);
        this.collection.on('change', this.render, this);
        this.collection.on('reset', this.render, this);
        this.collection.on('remove', this.render, this);
    },
    deleteArticle: function() {
        this.collection.deleteArticle();
    }
})

app.Views.ArticlesCommandeView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<a class="article-commande <%= etat %>" data-id_article="<%= id_article %>"> <%= count %> x <%= name %><span class="count"><%= prix %></span></a>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        console.log('change views articlecommande');
        return this;
    },
    events: {
        "click a.article-commande": 'toggleActive',
    },
    initialize: function() {
        this.model.on('change:etat', this.render, this);
        this.model.on('click', this.toggleActive, this);

    },
    toggleActive: function() {
        this.model.toggleActive();
    },
    deleteArticle: function() {

    }

});