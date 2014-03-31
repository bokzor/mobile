app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'commande': 'commande',
        'client': 'client',
    },
    home: function() {
        // on affiche les catégories
        if (localStorage.connectOK == 'ok') {
            app.user.validerLogin(localStorage.username, localStorage.password);
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
        if (app.views.app === undefined) {
            app.views.app = new app.Views.App({
                el: $('#content')
            });
            console.log('creation of the application');

        } else {
            console.log('application already exist');
            app.views.app.render();
        }

    },
    client: function() {
        console.log('route recherche client');
        new app.Views.SearchUser({
            el: $('#content')
        }).render();
        app.collections.users.fetch();
    },

});