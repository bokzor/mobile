app.Views.LoaderView = Backbone.View.extend({
    template: _.template('<div id="loader"></div>'),
    id: 'loader-container',
    render: function() {
        $('body').prepend(this.$el.html(this.template()));
    },
    initialize: function() {
        this.render();
    }


});