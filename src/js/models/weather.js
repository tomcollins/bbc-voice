define(['jquery', 'backbone'],
    function($, Backbone) {

        var WeatherModel = Backbone.Model.extend({
            initialize: function() {

            },
            defaults: {
                location: null
            }
        });

        return WeatherModel;

    }

);
