app.Views.SnapView = Backbone.View.extend({
    className: 'snap-drawers',
    render: function() {

    },
    initialize: function() {
        // on cree une reference pour le snap droit et gauche
        this.snapRight = new app.Views.SnapRightView();
        this.snapLeft = new app.Views.SnapLeftView({
            model: this.model
        });
        // on ajouter le html du snap droit et gauche a la vue snap
        this.$el.html(this.snapRight.el).append(this.snapLeft.el);
        // on place le html apres l'id content
        $('#content').after(this.el);
        app.snapper = new Snap({
            element: document.getElementById('content')
        });
        if (getMobileWidth() > 599) {
            //app.snapper.disable();
        }

    },
    remove: function() {
        console.log('remove snap');
        this.snapRight.remove();
        this.snapLeft.remove();
    }

})


app.Views.SnapLeftView = Backbone.View.extend({
    className: 'snap-drawer snap-drawer-left',
    id: 'left-drawer',
    profile: _.template('<div class="container-image-profile"><div class="dummy"><%= first_name %>  <%= last_name %></div>' +
        '<div class="snap-left-login-profile" style="background-image:url(<%= imageUrl %>)">' +
        '</div></div>'),
    menus: _.template('<ul class="list">' +
        '<li><a class="icon icon-qrcode" id="qr">Votre code QR </a></li>' +
        '<li><a class="icon icon-facebook" id="lier-facebook">Lier a Facebook</a></li>' +
        '<li class="icon list-divider"></li>' +
        '<li><a class="icon icon-enter" id="logout">Se deconnecter</a></li>' +
        '</ul>'),
    events: {
        'click #lier-facebook': 'facebook',
        'click #logout': 'logout',
        'click #qr': 'qrcode',
    },
    initialize: function() {
        var that = this;
        $(document).on('click', '#toggle-left', function() {
            var data = app.snapper.state();
            if (data['state'] !== 'closed') {
                app.snapper.close();
                $('body').removeClass('snapjs-left');
            } else {
                app.snapper.open('left');
            }
        });

        this.model.on('change', function() {
            that.render();
        })

        this.render();
        return this;
    },
    facebook: function() {
        app.user.loginFacebook();
    },
    logout: function() {
        app.user.logout();
    },
    qrcode: function() {
        app.modal = new app.Views.ModalView().qrcode(app.user.get('hash'));
    },
    render: function() {
        var imageUrl = app.config.url + '/uploads/avatar/' + this.model.get('avatar');
        this.$el.html(this.profile({
            imageUrl: imageUrl,
            last_name: this.model.get('last_name'),
            first_name: this.model.get('first_name')
        }) + this.menus());
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