app.Views.SnapView = Backbone.View.extend({
    render: function() {
        this.snapRight = new app.Views.SnapRightView({
            el: $('#sidebar')
        });
        this.snapLeft = new app.Views.SnapLeftView({
            el: $('#menu')
        });
    },
    initialize: function() {
        this.render();
    },
    remove: function() {
        this.snapRight.remove();
        this.snapLeft.remove();
    }

})


app.Views.SnapLeftView = Backbone.View.extend({
    initialize: function() {
        var _this = this;
        console.log('initialize left snap');
        $(document).on('click', '#toggle-left', function() {
            _this.toggle();
            console.log('click snap left');
        });

        this.render();
    },
    menus: _.template('<ul class="list">' +
        '<li><a id="qr">Votre code QR </a></li>' +
        '<li><a id="lier-facebook">Lier son compte Facebook</a></li>' +
        '<li class="list-divider"></li>' +
        '<li><a id="logout">Se déconnecter</a></li>' +
        '</ul>'),
    events: {
        'click #lier-facebook': 'facebook',
        'click #logout': 'logout',
        'click #qr': 'qrcode',
    },
    toggle: function() {
        $('body').removeClass("active-sidebar").toggleClass("active-nav");
        $('.sidebar-button').removeClass("active-button");
        $('.menu-button').toggleClass("active-button");
        console.log('toggle');
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
        this.$el.html(this.menus());
    },

});


app.Views.SnapRightView = Backbone.View.extend({
    initialize: function() {
        var _this = this;
        $(document).on('click', '#toggle-right', function() {
            _this.toggle();
        });
        this.commandeView = new app.Views.Commande({
            collection: app.collections.commande
        })
        this.render();
    },
    render: function() {
        this.$el.html(this.commandeView.el);
    },
    toggle: function() {
        $('body').removeClass("active-nav").toggleClass("active-sidebar");
        $('.menu-button').removeClass("active-button");
        $('.sidebar-button').toggleClass("active-button");
    },
});