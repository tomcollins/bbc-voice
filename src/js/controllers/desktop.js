define([
    'app', 'backbone', 'marionette', 
    'views/header', 'views/status', 'views/welcome', 'views/weather', 
    'models/status'
  ],
  function(
    App, Backbone, Marionette, 
    HeaderView, StatusView, WelcomeView, WeatherView,
    StatusModel
  ) {

    return Backbone.Marionette.Controller.extend({

        initialize: function() {

            var headerView = new HeaderView();
            var statusModel = new StatusModel();
            console.log('statusModel', statusModel.get('state'));
            var statusView = new StatusView({
                model: statusModel
            });
            setTimeout(function(){
                console.log('set state');
                statusModel.set('state', StatusModel.LISTENING);
            }, 4000);
            App.headerRegion.show(headerView);
            headerView.statusRegion.show(statusView);

        },
        index: function() {
            App.mainRegion.show(new WelcomeView());
        },
        weather: function() {
            App.mainRegion.show(new WeatherView());
        }


    });
});
