app.Views.App = Backbone.View.extend({
    template: _.template('<header class="bar-title">' +
        '<button class="button" id="toggle-left"><i class="icon-menu"></i></button>' +
        '<h1 class="title"></h1>' +
        '<button class="button" id="toggle-right"><i class="icon-basket"></i><span id="count-basket" class="count">0</span></button>' +
        '</header>' +
        '<div class="bar-standard bar-header-secondary">' +
        '<input type="search" id="recherche" placeholder="Recherche">' +
        '</div>' +
        '<section id="sidebar" role="navigation"></section>' +
        '<section id="content" role="main"></section>' +
        '<section id="menu" role="complementary"></section>'),
    events: {
        "input #recherche": "recherche",
    },
    recherche: function(e) {
        // fonction est appeler lors de l'ajout de carractères dans la barre de recherche
        app.collections.articles.recherche($(e.target).val());
        console.log('recherche en cours');
    },
    render: function() {
        console.log('render app');
        // on retire le loader si il est actif
        if (app.views.loader !== undefined) {
            app.views.loader.remove();
        }
        this.$el.html(this.template());
        // on va creer les vues pour le slide gauche et le slide droit
        app.views.snap = new app.Views.SnapView();
        // on va creer la barre d'action avec les boutons pour commander, modifier, encaisser
        app.views.barreAction = new app.Views.BarreActionView();
        // on va creer la vue pour les commandes lives
        app.collections.commandeLive = new app.Collections.commandeLive();
        // on va creer la collection pour la vue commande live
        app.views.live = new app.Views.Live({
            collection: app.collections.commandeLive
        });

        // on affiche la vue des catégories
        app.views.cats.render();
    },
    initialize: function() {
        this.render();
    },
    delete: function() {
        //app.snapper.disable();
        app.views.snap.remove();
        app.views.barreAction.remove();
        app.collections.commandeLive.close();
    }
})