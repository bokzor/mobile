// s'occupe de l'affichage de la listes des categories. Revoir le cas des sous sous catégories

app.Views.CatsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list cats',
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
        $('#content').html(this.$el);
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