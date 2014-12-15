define(['jquery', 'views', 'utils/synthesis'],
  function($, Views, synthesis) {

    var currentView = undefined;

    var currentViewIsWeather = false;

    function setView(view) {
      var nextView = function() {
        $('#main').replaceWith('<div id="main"></div>');
        currentView = view;
        currentView.render();
      };
      if (currentView) {
        currentView.remove(nextView);
      } else {
        nextView();
      }
    };

    return {
      initialise: function() {
        var headerView = new Views.Header();
        headerView.render();

        var welcomeView = new Views.Welcome();
        setView(welcomeView);

        $('#header').on('click', function(){
          var view;
          if (!currentViewIsWeather) {
            currentViewIsWeather = true;
            view = new Views.Weather();
          } else {
            currentViewIsWeather = false;
            view = new Views.Welcome();
          }
          setView(view);
        });

      }
    };

  });

