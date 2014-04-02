app.Models.newCommande = Backbone.Model.extend({
    defaults: {
        'url': null,
        'table_id': null,
        'commande': null,
        'commande_id': null,
        'bancontact': null,
        'cash': null,
        'statut_id': null,
    }
});

app.Collections.newCommande = Backbone.Collection.extend({
    model: app.Models.newCommande,
    localStorage: new Backbone.LocalStorage("newCommande"),
    initialize: function() {
        this.launch();
        this.interval = setInterval(launch, 10000);
    },
    launch: function() {

    }
});

function launch() {
    app.collections.newCommande.each(function(model) {
        $.ajax({
            type: 'POST',
            url: model.get('url'),
            data: {
                table_id: model.get('table_id'),
                commande: model.get('commande'),
                commande_id: model.get('commande_id'),
                bancontact: model.get('bancontact'),
                cash: model.get('cash'),
                statut_id: model.get('statut'),
            },
            success: function() {
                app.collections.newCommande.remove(model.get('id'));
            },
            error: function() {
                console.log('Erreur lors de l\'enregistrement de la commande');
            }
        });
    });
}