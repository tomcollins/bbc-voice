define(['backbone', 'marionette'], function(Backbone) {
   return Backbone.Marionette.AppRouter.extend({
       appRoutes: {
           '': 'index',
           'weather': 'weather'
       }
   });
});
