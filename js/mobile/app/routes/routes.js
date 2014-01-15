app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'commande': 'commande'
    },
    home: function() {
        // on affiche les catégories
        $.ajax({
            type: 'GET',
            url: app.config.url + '/basic_auth',
            success: function(data, textStatus, request) {
                app.user.set({
                    logged: true
                });
                app.routes.navigate('commande', {
                    trigger: true,
                    replace: true
                });
            },
            error: function(request, textStatus, errorThrown) {
                app.routes.navigate('login', {
                    trigger: true,
                    replace: true
                });
            }
        });
    },
    login: function() {
        console.log('route login');
        if (app.views.login === undefined) {
            app.views.login = new app.Views.LoginView({
                el: $('#content')
            });
        }
        app.views.login.render();
    },
    commande: function() {
        console.log('route commande')
        app.collections.articles.fetch();
        app.collections.categories.fetch();
        if (app.views.app === undefined) {
            app.views.app = new app.Views.App({
                el: $('#content')
            });
        }

    }

});