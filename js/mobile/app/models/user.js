app.Models.user = Backbone.Model.extend({
    defaults: {
        logged: false
    },
    initialize: function() {
        console.log('utilisateur créé');
        this.on('change:logged', this.fetchData, this);
    },

    fetchData: function() {
        if (this.get('logged') == true) {
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
    logout: function() {
        console.log('action logout');
        app.snapper.on('close', function() {
            var url = app.config.url + '/logout';
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
        var url = app.config.protocol + username + ':' + password + '@' + app.config.ip + '/basic_auth';
        console.log(url);
        $.ajax({
            type: 'GET',
            url: url,
            success: function(data, textStatus, request) {
                app.user.set({
                    logged: true
                });
            },
            error: function(request, textStatus, errorThrown) {
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
                                        console.log(data);
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
                            }
                        });
                }
            }, {
                scope: "email, user_birthday"
            }
        );
    }
});