app.Views.BarreActionView = Backbone.View.extend({
    tagName: 'nav',
    id: 'barre-action',
    className: 'bar-tab',
    barreAction: _.template('<ul class="tab-inner">' +
        '<li class="tab-item">' +
        '<a id="encaisser-action">' +
        '<span class="tab-icon icon-banknote"></span>' +
        '<div class="tab-label">Encaisser</div>' +
        '</a>' +
        '</li>' +
        '<li  class="tab-item">' +
        '<a id="commander-action">' +
        '<span class="tab-icon icon-checkmark"></span>' +
        '<div class="tab-label"><% if(app.infos.get("commandeId")=== -1){%>Commander<% } else { %>Modifier<% } %></div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="charger-action">' +
        '<span class="tab-icon icon-download"></span>' +
        '<div class="tab-label">Charger</div>' +
        '</a>' +
        '</li>' +
        '<li class="tab-item">' +
        '<a id="annuler-action">' +
        '<span class="tab-icon icon-close"></span>' +
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
        app.views.popup = new app.Views.PopupView();
        app.views.popup.commanderOptions();
    },
    encaisser: function() {
        app.snapper.close();
        app.views.popup = new app.Views.PopupView();
        app.views.popup.encaisser();
    },
    charger: function() {
        app.snapper.close();
        app.views.popup = new app.Views.PopupView();
        app.views.popup.charger();
    },
})