app.Views.App = Backbone.View.extend({
    template: _.template('<header class="bar-title">' +
        '<button class="button" id="toggle-left"><i class="icon-menu"></i></button>' +
        '<h1 class="title"></h1>' +
        '<button class="button" id="toggle-right"><i class="icon-basket"></i><span id="count-basket" class="count">0</span></button>' +
        '</header>' +
        '<div class="bar-standard bar-header-secondary">' +
        '<input type="search" id="recherche" placeholder="Recherche">' +
        '</div>' +
        '<div class="content">' +
        '</div>'),
    events: {
        "input #recherche": "recherche",
    },
    recherche: function(e) {
        app.collections.articles.recherche($(e.target).val());
        console.log('recherche en cours');
    },
    render: function() {
        console.log('render app');
        if (app.views.loader !== undefined)
            app.views.loader.remove();
        this.$el.html(this.template());
        app.views.snap = new app.Views.SnapView();
        app.views.barreAction = new app.Views.BarreActionView();
        app.collections.commandeLive = new app.Collections.commandeLive();
        app.views.live = new app.Views.Live({
            collection: app.collections.commandeLive
        });
    },
    initialize: function() {

        this.render();

    },
    delete: function() {
        app.snapper.disable();
        app.views.snap.remove();
        app.views.barreAction.remove();
        app.collections.commandeLive.close();
        app.collections.commandeLive.remove();
    }
})