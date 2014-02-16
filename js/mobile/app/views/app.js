app.Views.App = Backbone.View.extend({
    template: _.template('<header class="bar-title">' +
        '<button class="button" id="toggle-left"><span class="icon-menu"></span></button>' +
        '<h1 class="title"><% if(tableId!== -1) { %>Table : <%= tableId %> <% } %> </h1>' +
        '<button class="button" id="toggle-right"><span class="icon-cart"></span><span id="count-basket" class="count">0</span></button>' +
        '</header>'),
    templateRecherche: _.template('<div class="bar-standard bar-header-secondary">' +
        '<input type="search" id="recherche" placeholder="Recherche">' +
        '</div>'),
    templateContent: _.template('<div class="content"></div>'),
    events: {
        "input #recherche": "recherche",
    },
    recherche: function(e) {
        app.collections.articles.recherche($(e.target).val());
        console.log('recherche en cours');
    },
    changeTable: function(tableId) {
        this.$el.html(this.template({
            tableId: app.infos.get('tableId')
        }));
    },
    render: function() {
        console.log('render app');
        app.views.header = new app.Views.HeaderView();

        if (app.views.loader !== undefined) {
            app.views.loader.remove();
        }

        this.$el.html(app.views.header.render().el);
        this.$el.append(this.templateRecherche() + this.templateContent());

        app.views.snap = new app.Views.SnapView({
            model: app.user
        });
        app.views.barreAction = new app.Views.BarreActionView();
        app.collections.commandeLive = new app.Collections.commandeLive();
        app.views.live = new app.Views.Live({
            collection: app.collections.commandeLive
        });
        app.views.cats.render();

        return this;
    },
    initialize: function() {
        this.render();
    },
    delete: function() {
        app.snapper.disable();
        app.views.snap.remove();
        app.views.barreAction.remove();
        app.collections.commandeLive.close();
    }
})