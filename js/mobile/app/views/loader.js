app.Views.LoaderView = Backbone.View.extend({
    id: 'loader',
    initialize: function() {
        $('body').prepend(this.$el);
    }


});