app.Views.BarreActionView = Backbone.View.extend({
    tagName: 'nav',
    id: 'barre-action',
    className: 'bar-tab',
    barreAction: _.template('<ul class="tab-inner">' +
        '<li class="tab-item">' +
        '<a id="encaisser-action">' +
        '<i class="tab-icon icon-money"></i>' +
        '<div class="tab-label">Encaisser</div>' +
        '</a>' +
        '</li>' +
        '<li  class="tab-item">' +
        '<a id="commander-action">' +
        '<i class="tab-icon icon-ok"></i>' +
        '<div class="tab-label"><% if(app.infos.get("commandeId")=== -1){%>Commander<% } else { %>Modifier<% } %></div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="charger-action">' +
        '<i class="tab-icon icon-download"></i>' +
        '<div class="tab-label">Charger</div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="annuler-action">' +
        '<i class="tab-icon icon-cancel"></i>' +
        '<div class="tab-label">Annuler</div>' +
        '</a>' +
        '</li>' +
        '</ul>'),
    events: {
        "click #encaisser-action": "encaisser",
        "click #charger-action": "charger",
        "click #annuler-action": "annuler",
        "click #commander-action": "commander",
    },
    annuler: function() {
        if (app.collections.commande.length === 0) {
            app.snapper.close();
        }
        app.infos.annuler();
    },
    render: function() {
        this.$el.html(this.barreAction());
    },
    initialize: function() {
        this.render();
        $('body').append(this.$el);
    },
    commander: function() {
        app.snapper.close();
        new app.Views.PopupView().commanderOptions();
    },
    encaisser: function() {
        app.snapper.close();
        new app.Views.PopupView().encaisser();
    },
    charger: function() {
        app.snapper.close();
        new app.Views.PopupView().charger();
    },
})