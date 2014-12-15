define( ['app', 'jquery', 'underscore', 'backbone'],
    function(App, $, _, Backbone) {

        return Backbone.View.extend( {
            el: '#header',
            template: _.template($('#template-header').html()),
            render: function() {
                this.$el.html(this.template());
                return this;
            }
        });

    });
