/*global define */

define( ['app', 'jquery', 'utils/pubsub', 'views/list', 'views/article'],
    function(App, $, pubsub, List, Article) {

        var delayBetweenComponents = 750,
          delayBetweenArticles = 5000,
          classListOpen = 'main-list-container-open';

        var WelcomeView = function() {

        };
        WelcomeView.prototype.render = function() {
          var _this = this;

          $('#main').html(_.template($('#template-welcome').html()));

          this.list = new List();
          this.list.addItem({title: 'Gordon Brown to step down as M.P. next year.'});
          this.list.addItem({title: 'Nigel Farage blames M4 delay on imigration.'});
          this.list.addItem({title: 'Man City to build new £200 million training academy.'});
          this.list.render($('#list-container'));

          this.openListTimeoutId = setTimeout(function(){
            $('#list-container').addClass(classListOpen);
          }, delayBetweenComponents);

          this.setListIndexTimeoutId = setTimeout(function(){
            _this.list.setIndex(0);
          }, delayBetweenComponents * 2);

          pubsub.addListener('list:select', function(data){
            _this.displayArticle(data);
          });

        };
        WelcomeView.prototype.displayArticle = function(data) {
          var _this = this;

          clearTimeout(this.showArticleTimeoutId);
          clearTimeout(this.nextArticleTimeoutId);

          this.article = new Article(data);
          this.article.render();
          this.showArticleTimeoutId = setTimeout(function(){
            _this.article.show();
          }, delayBetweenComponents);

          this.nextArticleTimeoutId = setTimeout(function(){
            _this.list.next();
          }, delayBetweenArticles);
        };
        WelcomeView.prototype.remove = function(callback) {
          clearTimeout(this.openListTimeoutId);
          clearTimeout(this.setListIndexTimeoutId);
          clearTimeout(this.showArticleTimeoutId);
          clearTimeout(this.nextArticleTimeoutId);

          pubsub.removeEvent('list:select');

          var hideList = function() {
            $('#list-container').removeClass(classListOpen);
            setTimeout(callback, delayBetweenComponents);
          };

          if (this.article) {
            this.article.hide(hideList);
          } else {
            hideList();
          }

        };

        return WelcomeView;

    });
