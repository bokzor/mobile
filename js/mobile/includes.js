head.js(
    'cordova.js',
    'cdv-plugin-fb-connect.js',
    'facebook-js-sdk.js',
    'barcodescanner.js',
    'js/mobile/libs/zepto.js',
    'js/mobile/libs/snap.js',
    'js/mobile/libs/underscore.js',
    'js/mobile/libs/backbone.js',
    'js/mobile/libs/fastclick.js',
    'js/mobile/app.js',
    'js/mobile/app/models/models.js',
    'js/mobile/app/views/views.js',
    'js/mobile/app/views/snap.js',
    'js/mobile/app/views/commande.js',
    'js/mobile/app/views/live.js',
    'js/mobile/app/views/app.js',
    'js/mobile/app/views/login.js',
    'js/mobile/app/routes/routes.js'


);

head.ready(function() {
    document.addEventListener('deviceready', function() {
        app.init()
        // on initialise les deux panels
        // on active le fast click pour le mobile
        FastClick.attach(document.body);
        try {
            FB.init({
                appId: "1444408885775635",
                nativeInterface: CDV.FB,
                useCachedDialogs: false
            });
        } catch (e) {
            console.log(e);
        }

    });
});