app.Views.App = Backbone.View.extend({

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
        app.views.header = new app.Views.HeaderView({
            model: app.infos
        });

        // on supprime le loader
        if (app.views.loader !== undefined) {
            app.views.loader.remove();
        }

        this.$el.html(app.views.header.render().el);
        this.$el.append(this.templateRecherche() + this.templateContent());

        // on affiche le snap gauche et droit
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