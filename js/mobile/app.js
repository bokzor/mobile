var app = {
    // Classes
    Collections: {},
    Models: {},
    Views: {},
    Routes: {},
    // Instances
    collections: {},
    models: {},
    views: {},
    routes: {},
    config: {
        protocol: 'http://',
        url: 'http://liveorder.eu',
        ip: 'liveorder.eu',
    },

    init: function() {
        document.oncontextmenu = new Function("return false");
        document.onselectstart = new Function("return false");
        this.routes = new this.Routes.routeur();
        this.user = new this.Models.user();


        this.collections.articles = new this.Collections.articles;
        this.collections.categories = new this.Collections.categories;
        this.collections.commande = new this.Collections.commande;
        // on cree la vue qui va afficher les catégories
        this.views.cats = new this.Views.CatsView({
            collection: this.collections.categories,
            attributes: {
                level: 0
            }
        });

        this.infos = new this.Models.infos;
        this.views.articles = new this.Views.ArticlesView({
            collection: this.collections.articles,
            attributes: {
                cat_id: 0
            }
        });

        console.log('window.App Initialized');
        Backbone.history.start();

    }
}