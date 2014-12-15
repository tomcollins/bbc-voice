define(['jquery', 'backbone'],
    function($, Backbone) {

        var StatusModel = Backbone.Model.extend({
            initialize: function() {

            },
            defaults: {
                state: 'inactive' 
            }
        });
        StatusModel.INACTIVE = 'inactive';
        StatusModel.LISTENING = 'listening';
        StatusModel.MUTED = 'muted';

        return StatusModel;

    }

);
