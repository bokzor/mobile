app.Views.SnapView = Backbone.View.extend({
    className: 'snap-drawers',
    render: function() {
        this.snapRight = new app.Views.SnapRightView();
        this.snapLeft = new app.Views.SnapLeftView();
        this.$el.html(this.snapRight.el).append(this.snapLeft.el);

        $('#content').after(this.el);
    },
    initialize: function() {
        this.render();
        app.snapper = new Snap({
            element: document.getElementById('content')
        });
    },

})


app.Views.SnapLeftView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-left',
    id: 'left-drawer',
    menus: _.template('<ul class="list">' +
        '<li><a>Gestion des commandes</a></li>' +
        '<li><a id="lier-facebook">Lier son compte Facebook</a></li>' +
        '<li class="list-divider"></li>' +
        '<li><a id="logout">Se déconnecter</a></li>' +
        '</ul>'),
    events: {
        'click #lier-facebook': 'facebook',
        'click #logout': 'logout',
    },
    facebook: function() {
        app.user.loginFacebook();
    },
    logout: function() {
        app.user.logout();
    },

    render: function() {
        this.$el.html(this.menus());
    },
    initialize: function() {
        $(document).on('click', '#toggle-left', function() {
            var data = app.snapper.state();
            if (data['state'] !== 'closed') {
                app.snapper.close();
            } else {
                app.snapper.open('left');
            }
        });

        this.render();
    },
});


app.Views.SnapRightView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-right',
    id: 'right-drawer',
    initialize: function() {
        $(document).on('click', '#toggle-right', function() {
            var data = app.snapper.state();
            if (data['state'] !== 'closed') {
                app.snapper.close();
            } else {
                app.snapper.open('right');
            }
        });
        this.commandeView = new app.Views.Commande({
            collection: app.collections.commande
        })
        this.render();
    },
    render: function() {
        this.$el.html(this.commandeView.el);
    }
});