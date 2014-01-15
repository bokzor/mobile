app.Views.Live = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',
    id: 'live',
    addOne: function(live) {
        var liveView = new app.Views.CommandesLiveView({
            model: live
        });
        this.$el.append(liveView.render().el);
    },
    render: function() {
        this.$el.empty();
        // on ajoute un a un les articles
        this.collection.forEach(this.addOne, this);
        $('#right-drawer').append(this.$el);
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

});

app.Views.CommandesLiveView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<a class="commande statut-<%= statut_id %>" data-id_commande="<%= id %>"><%= serverPrenom %> <%= serverNom %> - Table : <%= table_id %></a>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        console.log('render commandes live views');
        return this;
    },
    events: {
        "click a.commande": 'chargerCommande',
    },
    initialize: function() {
        this.model.on('change:statut_id', this.alertStatut, this);
        this.model.on('click', this.toggleActive, this);
    },
    chargerCommande: function(e) {
        var id = $(e.currentTarget).data("id_commande");
        app.collections.commande.chargerId(id);
    },
    alertStatut: function() {
        this.render();
        navigator.notification.beep(1);

    }


});