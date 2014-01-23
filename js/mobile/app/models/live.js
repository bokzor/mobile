app.Models.commande = Backbone.Model.extend({
    defaults: {},
    initialize: function Doc() {}
});

app.Collections.commandeLive = Backbone.Collection.extend({
    model: app.Models.commande,
    initialize: function() {
        this.launch();
        this.interval = setInterval(this.launch, 10000);
    },
    launch: function() {
        var commande;
        var url = app.config.url + '/live/commande/general';
        $.getJSON(url, function(data) {
            // on va supprimer toutes les commandes qui ne sont pas présentes dans le flux live
            app.collections.commandeLive.each(function(model) {
                var result = $.grep(data, function(e) {
                    return e.id === model.get('id');
                });
                if (result.length != 1) {
                    app.collections.commandeLive.remove(model.get('id'));
                }
            });
            for (var i = 0; i < data.length; i++) {
                var new_order = false;
                var ready_order = false;
                var commande = {
                    id: data[i]['id'],
                    serverPrenom: data[i]['serverPrenom'],
                    serverNom: data[i]['serverNom'],
                    table_id: data[i]['table_id'],
                    clientNom: data[i]['clientNom'],
                    statut_commande: data[i]['statut_commande'],
                    statut_id: data[i]['statut_id'],
                    server_id: data[i]['server_id'],
                }
                if (app.collections.commandeLive.get(data[i]['id']) == undefined) {
                    app.collections.commandeLive.add(commande);
                    if (data[i]['server_id'] !== app.infos.get('serverId')) {
                        var titleNotif = 'Nouvelle commande';
                        new_order = true;
                    }
                } else {
                    commandeLive = app.collections.commandeLive.get(data[i]['id']);
                    if (commandeLive.get('statut_id') != data[i]['statut_id']) {
                        var titleNotif = 'Commande prête';
                        ready_order = true;
                    }
                    commandeLive.set({
                        statut_id: data[i]['statut_id']
                    });
                }
            }
            if (new_order === true || ready_order === true) {
                navigator.notification.beep(1);
            }

        });
    },
    close: function() {
        clearInterval(this.interval);
        app.collections.commandeLive.remove();
    }
});