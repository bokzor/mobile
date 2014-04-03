app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'commande': 'commande',
        'client': 'client',
    },
    home: function() {
        // on affiche les catégories
        console.log('home');
        if (localStorage.connect == 'ok') {
            app.user.validerLogin(localStorage.username, localStorage.password);
            app.routes.navigate('commande', {
                trigger: true,
                replace: true
            });
        } else {
            app.routes.navigate('login', {
                trigger: true,
                replace: true
            });
        }

    },
    login: function() {
        $('#content').addClass('login');
        console.log('route login');
        app.views.login = new app.Views.LoginView();
    },
    commande: function() {
        if (app.user.get('logged') == false) {
            app.routes.navigate('home', {
                trigger: true,
                replace: true
            });
        }
        $('#content').removeClass('login');
        console.log('route commande');
        app.views.app = new app.Views.App({
            el: $('#content')
        });
        console.log('creation of the application');

    },
    client: function() {
        console.log('route recherche client');
        new app.Views.SearchUser({
            el: $('#content')
        }).render();
        app.collections.users.fetch();
    },

});