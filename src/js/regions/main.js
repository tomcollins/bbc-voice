define( ['app', 'jquery', 'backbone', 'marionette'],
    function(App, $, Backbone) {

        var MainRegion = Backbone.Marionette.Region.extend({
          el: '#main',
          onBeforeShow: function() {
            console.log('region before show');
          },
          onShow: function() {
            console.log('region show');
          },
          onBeforeSwap: function() {
            console.log('region before swap');
          },
          onSwap: function() {
            console.log('region swap');
          },
          onBeforeEmpty: function() {
            console.log('region before empty');
          },
          onEmpty: function() {
            console.log('region empty');
          }
        });
        return MainRegion;

    });
