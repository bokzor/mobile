app.Views.App = Backbone.View.extend({

    templateRecherche: _.template('<div class="bar-standard bar-header-secondary">' +
        '<input type="search" id="recherche" placeholder="Recherche">' +
        '</div>'),
    templateContent: _.template('<div class="content"></div>'),
    events: {
        "input #recherche": "recherche",
        "click #recherche": function() {
            $('#recherche').val('');
            app.collections.articles.recherche('');
        }
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
        console.log(this.el);

        // on supprime le loader
        if (app.views.loader !== undefined) {
            app.views.loader.remove();
        }


        this.$el.html(app.views.header.render().el);
        this.$el.append(this.templateRecherche() + this.templateContent());



        app.views.cats.render();

        return this;
    },
    initialize: function() {
        // on affiche le header

        app.views.header = new app.Views.HeaderView({
            model: app.infos
        });
        // on affiche le snap gauche et droit
        app.views.snap = new app.Views.SnapView({
            model: app.user
        });
        // on affiche la barre d'action
        app.views.barreAction = new app.Views.BarreActionView();


        app.collections.commandeLive = new app.Collections.commandeLive();

        // on affiche les commandes lives
        app.views.live = new app.Views.Live({
            collection: app.collections.commandeLive
        });


        this.render();
    },
    delete: function() {
        console.log('app remove');
        app.snapper.disable();
        app.views.login.remove();
        app.views.snap.remove();
        app.views.barreAction.remove();
        app.collections.commandeLive.close();
    }
})