app.Models.user = Backbone.Model.extend({
    url: app.config.url + '/rest/user.json',

    defaults: {
        logged: false,
        statut: 'client',
    },
    initialize: function() {
        this.on('change:logged', this.fetchData, this);
    },

    fetchData: function() {
        if (this.get('logged') == true) {
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
        // on ecoute l'evenement close des slides. Lorsqu'on est sur que celui-ci est fermé.
        // On deconnecte l'utilisateur et on supprime l'application

        localStorage.connectOk = false;
        var url = app.config.url + '/logout';
        $.ajax({
            type: 'GET',
            url: url,
            complete: function(data, textStatus, request) {
                app.user.set({
                    logged: false
                });
                app.routes.navigate('login', {
                    trigger: true,
                    replace: true
                });
                console.log('action logout');
            },

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
                var data = $.parseJSON(data);
                if (data.first_name !== undefined) {
                    app.user.set({
                        logged: true,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        avatar: data.avatar
                    });

                    localStorage.connectOk = 'ok';
                    localStorage.username = username;
                    localStorage.password = password
                    return true;
                } else {
                    app.views.loader.remove();
                    app.user.set({
                        logged: false
                    });
                    navigator.notification.alert('Mot de passe incorrect.');

                    return false;
                }
            },
            error: function(request, textStatus, errorThrown) {
                app.views.loader.remove();
                app.user.set({
                    logged: false
                });
                //navigator.notification.alert('Mot de passe incorrect.');

                return false;
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
                                        var data = $.parseJSON(data);
                                        if (data.first_name !== undefined) {
                                            app.user.set({
                                                logged: true,
                                                first_name: data.first_name,
                                                last_name: data.last_name,
                                                avatar: data.avatar
                                            });
                                        }
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