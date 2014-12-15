define( ['app', 'jquery', 'utils/pubsub', 'views/list'],
    function(App, $, pubsub, List) {

        var delayBetweenComponents = 750,
          classListOpen = 'main-list-container-open';

        var WeatherView = function() {

        };
        WeatherView.prototype.render = function() {
          var _this = this;

          $('#main').html(_.template($('#template-weather').html()));

          this.list = new List();
          this.list.addItem({title: 'Now'});
          this.list.addItem({title: 'Tonight'});
          this.list.addItem({title: 'Tomorrow'});
          this.list.render($('#list-container'));

          this.openListTimeoutId = setTimeout(function(){
            $('#list-container').addClass(classListOpen);
          }, delayBetweenComponents);

        };
        WeatherView.prototype.remove = function(callback) {
          clearTimeout(this.openListTimeoutId);
          $('#list-container').removeClass(classListOpen);
          setTimeout(callback, delayBetweenComponents);
        };

        return WeatherView;

    });
