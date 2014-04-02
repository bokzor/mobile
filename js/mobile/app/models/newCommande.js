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
    localStorage: new Backbone.LocalStorage("newCommande")
});