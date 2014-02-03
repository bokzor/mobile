head.js(
    'cordova.js',
    'cdv-plugin-fb-connect.js',
    'facebook-js-sdk.js',
    'barcodescanner.js',
    'js/mobile/libs/zepto.js',
    'js/mobile/libs/touch.js',
    'js/mobile/libs/prefixfree.js',
    'js/mobile/libs/underscore.js',
    'js/mobile/libs/backbone.js',
    'js/mobile/libs/fastclick.js',
    'js/mobile/libs/jquery.qrcode.js',
    'js/mobile/app.js',

    'js/mobile/app/models/models.js',
    'js/mobile/app/models/user.js',
    'js/mobile/app/models/commande.js',
    'js/mobile/app/models/live.js',

    'js/mobile/app/views/articles.js',
    'js/mobile/app/views/users.js',
    'js/mobile/app/views/cats.js',
    'js/mobile/app/views/views.js',
    'js/mobile/app/views/snap.js',
    'js/mobile/app/views/loader.js',
    'js/mobile/app/views/popup.js',
    'js/mobile/app/views/modal.js',
    'js/mobile/app/views/commande.js',
    'js/mobile/app/views/live.js',
    'js/mobile/app/views/app.js',
    'js/mobile/app/views/login.js',
    'js/mobile/app/routes/routes.js'


);

head.ready(function() {
    function checkConnection() {
        // var networkState = navigator.connection.type;
        //if (networkState === 'Connection.NONE') {
        //   alert('Merci de vous connecter au Wifi');
        //}
    }

    // fonction pour corriger les elements fixed et absolute dans le cadre d'ios.
    $(document).on('focus', 'select, input, textarea', function() {
        $('.black-overlay').css('position', 'static');
    });
    $(document).on('blur', 'select, input, textarea', function() {
        $('.black-overlay').css('position', 'absolute');
    });

    console.log('head ready');

    document.addEventListener('deviceready', function() {
        console.log('device ready');
        checkConnection();
        app.init()
        // on initialise les deux panels
        // on active le fast click pour le mobile
        FastClick.attach(document.body);


    });
});