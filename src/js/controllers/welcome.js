define(['jquery', 'utils/pubsub', 'controller'],
  function($, pubsub, Controller) {

    var ControllerWelcome = function(context, autoPlay) {
      Controller.call(this, context, autoPlay);
      this.hasData = false;
    };

    ControllerWelcome.prototype = Object.create(Controller.prototype);
    ControllerWelcome.prototype.constructor = ControllerWelcome;

    ControllerWelcome.prototype.hide = function(callback) {
      var _this = this;
      this.removePubSubEvents();
      
      if (!this.isShown) {
        callback();
      } else {
        this.isShown = false;
        this.$element.find('.welcome').addClass('welcome-close');
        setTimeout(function(){
          _this.$element.empty();
          callback();
        }, 500);
      }
    };

    ControllerWelcome.prototype.render = function($element) {
      var _this = this;
      
      var html = '<div class="column-wrap welcome">'
        + '<h2>Try one of these phrases:</h2>'
        + '<ul class=welcome-prompts>'
        + '<li class="index-0"><p>"BBC news"</p></li>'
        + '<li class="index-1"><p>"BBC business news"</p></li>'
        + '<li class="index-2"><p>"BBC news about London"</p></li>'
        + '<li class="index-3"><p>"BBC Bristol weather"</p></li>'
        + '<li class="index-4"><p>"BBC weather in London on friday"</p></li>'
        + '<li class="index-5"><p>"BBC do i need an umbrella in Cardiff tomorrow"</p></li>'
        + '</ul>'
        + '</div>';
        $element.html(html);

        setTimeout(function(){
          $element.find('.welcome').addClass('welcome-active');
        });
    };

    return ControllerWelcome;

});
