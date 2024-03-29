app.Views.LoginView = Backbone.View.extend({
    id: 'content',
    className: 'login snap-content',
    template: _.template('<form id="loginForm">' +
        '<img src="img/LiveOrder.png" alt="">' +
        '<input id="username" type="text" placeholder="Adresse Email">' +
        '<input id="password" type="password" placeholder="Mot de passe">' +
        '<input type="submit" id="valider-login" value="Se connecter">' +
        '</form>' +
        '<div class="black-overlay">' +
        '<div id="login-facebook" class="facebook"><span>Se connecter avec Facebook</span></div>' +
        '<span>S\'enregister</span>' +
        '</div>'),
    render: function() {
        console.log('render login view');
        console.log(this.$el);
        this.$el.html(this.template());
        $('body').html(this.$el);
    },
    initialize: function() {
        console.log('initialize login view');
        this.render();
    },
    events: {
        "click #login-facebook": "loginFacebook",
        "click #valider-login": "validerLogin"
    },
    validerLogin: function(e) {
        e.preventDefault();
        var username = this.$el.find('#username').val();
        var password = this.$el.find('#password').val();
        app.views.loader = new app.Views.LoaderView();
        app.user.validerLogin(username, password);
    },
    loginFacebook: function(e) {
        e.preventDefault();
        console.log('login with facebook');
        app.views.loader = new app.Views.LoaderView();
        app.user.loginFacebook();
    },



});