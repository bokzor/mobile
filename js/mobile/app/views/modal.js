app.Views.ModalView = Backbone.View.extend({
    id: 'myModal',
    className: 'modal',
    initialize: function() {
        this.render();
    },
    template: _.template('<header class="bar-title">' +
        '<a id="fermer-modal" class="button">Fermer</a>' +
        '</header>'),
    render: function() {
        this.$el.addClass('active');
        $('body').prepend(this.$el.html(this.template()));
    },
    events: {
        'click #fermer-modal': 'remove'
    },
    qrcode: function(text) {
        this.$el.qrcode({
            width: 200,
            height: 200,
            color: '#3a3',
            text: text,
        });
    }



});