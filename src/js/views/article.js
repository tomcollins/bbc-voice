define( ['app', 'jquery', 'utils/pubsub'],
    function(App, $, pubsub) {

        var classInactive = 'article-inactive',
          delayShowHide = 750;

        var ArticleView = function(data) {
            this.data = data;
        };
        ArticleView.prototype.render = function() {
          $('#article-container').html(_.template($('#template-article').html()));
          this.$element = $('#article');
          this.$element.find('h1').text(this.data.title);
        };
        ArticleView.prototype.show = function(callback) {
          this.$element.removeClass(classInactive);
          if (callback) {
            setTimeout(callback, delayShowHide);
          }

          pubsub.emitEvent('synthesis:speak', [this.data.title]);
        };
        ArticleView.prototype.hide = function(callback) {
          this.$element.addClass(classInactive);
          if (callback) {
            setTimeout(callback, delayShowHide);
          }
        };

        return ArticleView;

    });
