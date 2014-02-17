app.Models.user = Backbone.Model.extend({
    url: app.config.url + '/rest/user.json',

    defaults: {
        logged: false,
        statut: 'client',
    },
    initialize: function() {
        console.log('utilisateur créé');
        this.on('change:logged', this.fetchData, this);
    },

    fetchData: function() {
        if (this.get('logged') == true) {

            // si l'utilisateur est loggé on va rechercher les données
            this.fetch();
            app.routes.navigate('commande', {
                trigger: true,
                replace: true
            });
            app.collections.articles.fetch();
            app.collections.categories.fetch();

        } else {
            app.routes.navigate('login', {
                trigger: true,
                replace: true
            });
        }
    },
    logout: function() {
        console.log('action logout');
        // on ecoute l'evenement close des slides. Lorsqu'on est sur que celui-ci est fermé.
        // On deconnecte l'utilisateur et on supprime l'application
        app.snapper.on('close', function() {
            var url = app.config.url + '/logout';
            // on supprime les cookies sur le serveur distant
            $.get(url);
            app.user.set({
                logged: false
            });
            app.views.app.delete();
            app.routes.navigate('login', {
                trigger: true,
                replace: true
            });
        });
        app.snapper.close();


    },
    validerLogin: function(username, password) {
        var url = app.config.protocol + app.config.ip + '/basic_auth';
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                password: password,
                username: username
            },
            success: function(data, textStatus, request) {
                if (data === 'client' || data === 'serveur') {
                    app.user.set({
                        logged: true
                    });
                } else {
                    app.views.loader.remove();
                    app.user.set({
                        logged: false
                    });
                    navigator.notification.alert('Mot de passe incorrect.');
                }
            },
            error: function(request, textStatus, errorThrown) {
                app.views.loader.remove();
                app.user.set({
                    logged: false
                });
            }
        });
    },
    loginFacebook: function() {
        FB.login(
            function(response) {
                if (response.authResponse) {
                    FB.api('/me', {
                            fields: 'first_name, last_name, picture.width(600).height(600), email, birthday, gender'
                        },
                        function(response) {
                            if (!response.error) {
                                user = response;
                                var accessToken = FB.getAuthResponse()['accessToken'];
                                $.ajax({
                                    data: {
                                        accessToken: accessToken,
                                    },
                                    type: 'POST',
                                    url: app.config.url + '/facebook_auth',
                                    success: function(data, textStatus, request) {
                                        app.user.set({
                                            logged: true
                                        });
                                    },
                                });

                            } else {
                                console.log('Error getting user info: ' + JSON.stringify(response.error));
                                // Check for errors due to app being unininstalled
                                if (response.error.error_subcode && response.error.error_subcode == "458") {
                                    setTimeout(function() {
                                        alert("The app was removed. Please log in again.");
                                    }, 0);
                                }
                                this.set({
                                    logged: false
                                });
                                app.views.loader.remove();

                            }
                        });
                }
            }, {
                scope: "email, user_birthday"
            }
        );
    }
});


app.Collections.users = Backbone.Collection.extend({
    model: app.Models.user,
    comparator: 'name',
    url: app.config.url + '/rest/users.json',
    recherche: function(query) {
        app.views.users.attributes['recherche'] = query;
        app.views.users.recherche();
    }
});