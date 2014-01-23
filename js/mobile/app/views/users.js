app.Views.SearchUser = Backbone.View.extend({
    template: _.template('<header class="bar-title">' +
        '<h1 class="title">Annuler</h1>' +
        '</header>' +
        '<div class="bar-standard bar-header-secondary">' +
        '<input type="search" id="recherche-user" placeholder="Recherche">' +
        '</div>' +
        '<div class="content">' +
        '</div>'),
    events: {
        "input #recherche-user": "recherche",
        "click h1": "annuler",
    },
    recherche: function(e) {
        app.collections.users.recherche($(e.target).val());
        console.log('recherche en cours d\'un utilisateur');
    },
    annuler: function() {
        console.log('cancel recherche');
        app.routes.navigate('commande', {
            trigger: true,
            replace: true
        });
    },
    render: function() {
        console.log('render search user');
        this.$el.html(this.template());
        app.views.users = new app.Views.UsersView({
            collection: app.collections.users,
            attributes: {},
        });

    },
    initialize: function() {
        this.render();
    },
})


// s'occupe d'afficher la liste des articles
app.Views.UsersView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    filter: function(model) {
        // sinon on renvoit les articles de la recherche
        if (model.attributes.name.toLowerCase().indexOf(this.attributes.recherche.toLowerCase()) !== -1) {
            return true;
        }

    },
    recherche: function(model) {
        this.$el.empty();
        this.collection.filter(this.filter, this).slice(0, 20).forEach(this.addOne, this);
        $('.content').append(this.$el);
    },
    addOne: function(user) {
        var userView = new app.Views.UserView({
            model: user
        });
        this.$el.append(userView.render().el);
        console.log(userView.render().el);
        console.log('on ajouter un utilisateur a la liste');
    },
    render: function() {
        this.$el.empty();
        this.collection.filter(this.filter, this).forEach(this.addOne, this);
        $('.content').html(this.$el);
    },
    initialize: function() {
        this.render();
    }
});

app.Views.UserView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('<a data-username="<%= username %>"> <%= name %></a>'),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'tap a': 'select',
    },
    select: function(e) {
        var username = $(e.currentTarget).data("username");
        var infos = new Array();
        infos['username'] = username;
        app.collections.commande.chargerClient(infos);
        console.log(username);
        app.routes.navigate('commande', {
            trigger: true,
            replace: true
        });
        app.snapper.open('right');

    }
});