app.Views.LoginView = Backbone.View.extend({
    template: _.template('<div id="bg">' +
        '<img src="img/login.png" alt="">' +
        '</div>' +
        '<form id="loginForm">' +
        '<img src="img/LiveOrder.png" alt="">' +
        '<input id="username" type="text" placeholder="Adresse Email">' +
        '<input id="password" type="password" placeholder="Mot de passe">' +
        '<input type="submit" id="valider-login" value="Se connecter">' +
        '</form>' +
        '<div class="black-overlay">' +
        '<div id="login-facebook" class="facebook"><span>Login with Facebook</span></div>' +
        '<span>S\'enregister</span>' +
        '</div>'),
    render: function() {
        this.$el.html(this.template());
    },
    events: {
        "click #login-facebook": "loginFacebook",
        "click #valider-login": "validerLogin"
    },
    validerLogin: function(e) {
        e.preventDefault();
        var username = this.$el.find('#username').val();
        var password = this.$el.find('#password').val();
        app.user.validerLogin(username, password);
    },
    loginFacebook: function(e) {
        e.preventDefault();
        console.log('login with facebook');
        app.user.loginFacebook();
    },


});