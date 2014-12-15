define( ['app', 'jquery', 'backbone'],
    function(App, $, Backbone) {

        return Backbone.View.extend({
            id: 'status',
            template: false,
            modelEvents: {
                "change:state": function(model, state) {
                    this.$el.removeClass();
                    this.$el.addClass(state);
                }
            },
        });

    });
