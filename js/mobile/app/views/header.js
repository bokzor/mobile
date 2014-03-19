app.Views.HeaderView = Backbone.View.extend({
    tagName: 'header',
    id: 'barre-header',
    className: 'bar-title snap-content',
    template: _.template('<button class="button" id="toggle-left"><span class="icon-menu"></span></button>' +
        '<h1 class="title"><% if(tableId!== -1) { %>Table : <%= tableId %> <% } %> </h1>' +
        '<button class="button" id="toggle-right"><span class="icon-cart"></span><span id="count-basket" class="count">0</span></button>'),
    render: function() {
        console.log('render the Header');
        this.$el.html(this.template({
            tableId: this.model.get('tableId')
        }));
        return this;
    },
    initialize: function() {
        this.model.on('change:tableId', this.render, this);
    }
})


app.Views.SearchBarView = Backbone.View.extend({

})