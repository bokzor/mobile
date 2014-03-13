app.Routes.routeur = Backbone.Router.extend({
    routes: {
        '': 'home',
        'login': 'login',
        'commande': 'commande',
        'client': 'client',
    },
    home: function() {
        // on affiche les catégories
        $.ajax({
            type: 'POST',
            url: app.config.url + '/basic_auth',
            success: function(data, textStatus, request) {
                if (data === 'client' || data === 'serveur') {
                    console.log(data);
                    console.log('go commande');
                    app.user.set({
                        logged: true
                    });
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
            error: function(request, textStatus, errorThrown) {
                app.routes.navigate('login', {
                    trigger: true,
                    replace: true
                });
            }
        });
        app.routes.navigate('login', {
            trigger: true,
            replace: true
        });
    },
    login: function() {
        $('#content').addClass('login');
        console.log('route login');
        app.views.login = new app.Views.LoginView();

    },
    commande: function() {
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