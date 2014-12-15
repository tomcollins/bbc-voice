define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var classListItemSelected = 'list-item-selected',
      classListItemOpen = 'list-item-open';

    var List = function() {
      this.items = [];
    };

    List.prototype.addItem = function(item) {
      this.items.push(item);
    };

    List.prototype.render = function($element) {
      var _this = this;
      var html = '<ul class="list list-hidden">';
      this.items.forEach(function(item, index) {
        html += '<li class="list-item list-item-index-' +index +'" data-list-item-index="' +index +'">'
          + '<span class="list-item-strip"></span>'
          + '<div class="list-item-content">' +item.getHtml() +'</div>'
          + '</li>';
      });
      html += '</ul>';
      $element.append(html);
      this.$listElement = $element.find('.list');
      this.listElement = this.$listElement[0];

      /*
      this.$listElement.on('click', 'li', function(e) {
        var index = $(e.currentTarget).data('list-item-index');
        _this.setIndex(index);
      });
      */

    };

    List.prototype.addTransitionHandler = function(element, handler) {
      element.addEventListener("transitionend", handler, true);
    };

    List.prototype.removeTransitionHandler = function(element, handler) {
      element.removeEventListener("transitionend", handler, true);
    };

    List.prototype.transitionToClass = function($element, cssClass, removeClass, callback, callbackValidation) {
      var _this = this,
        transitionEndHandler;
      if (typeof callback === 'function') {
        transitionEndHandler = function(transitionEvent) {
          if (
            !callbackValidation
            || (typeof callbackValidation === 'string' && transitionEvent.propertyName === callbackValidation)
            || (typeof callbackValidation === 'function' && callbackValidation(transitionEvent))
          ) {
            _this.removeTransitionHandler($element[0], transitionEndHandler);
            callback();
          }
        };
        this.addTransitionHandler($element[0], transitionEndHandler);
      }
      if (removeClass) {
        $element.removeClass(cssClass);
      } else {
        $element.addClass(cssClass);
      }
    };

    List.prototype.show = function() {
      var _this = this,
        transitionEndCount = 0,
        transitionEndMax = _this.items.length * 2,
        validateTransitionEnd = function() {
          transitionEndCount++;
          if (transitionEndCount == transitionEndMax) {
            return true;
          }
        };
      setTimeout(function(){
        _this.transitionToClass(_this.$listElement, 'list-opening', false, function() {
          _this.$listElement.removeClass('list-opening');
          pubsub.emitEvent('list:show:complete');
        }, validateTransitionEnd);
        _this.$listElement.removeClass('list-hidden');
      }, 10);
    };

    List.prototype.hide = function() {
      var _this = this;
      this.transitionToClass(_this.$listElement, 'list-closing', false, function() {
        //_this.$listElement.removeClass('list-closing');
      });
    };

    List.prototype.next = function() {
      var index = this.index + 1;
      if (undefined === this.index) {
        return;
      }
      if (index >= this.items.length) {
        index = 0;
      }
      this.setIndex(index);
    };

    List.prototype.setIndex = function(index) {
      var _this = this,
        isNegativeIndexTransition = (undefined !== this.index) && (this.index > index),
        updateSelectedItem = function() {
          _this.selectedItemElement = _this.$listElement.find('li.list-item')[index];
          _this.$selectedItemElement = $(_this.selectedItemElement);
        },
        itemReady = function() {
          pubsub.emitEvent('list:item:active:complete', [_this.items[index], index]);
        },
        openItem = function($element, callback) {
          _this.transitionToClass($element, classListItemOpen, false, callback, 'height');
        },
        closeItem = function($element, callback) {
          _this.transitionToClass($element, classListItemOpen, true, callback, 'height');
        },
        selectItem = function($element, callback) {
          _this.transitionToClass($element, classListItemSelected, false, callback, 'left');
        },
        deselectItem = function($element, callback) {
          _this.transitionToClass($element, classListItemSelected, true, callback, 'left');
        },
        scrollListToIndex = function(callback) {
          var transitionEndHandler;
          if (typeof callback === 'function') {
            transitionEndHandler = function(transitionEvent) {
              if (transitionEvent.propertyName === 'top') {
                _this.removeTransitionHandler(_this.listElement, transitionEndHandler);
                callback();
              }
            };
            _this.addTransitionHandler(_this.listElement, transitionEndHandler);
          }
          _this.$listElement.css('top', -(index * 110));
        };

      if (index <0) {
        return;
      }
      if (index >= this.items.length) {
        return;
      }

      this.index = index;
      if (this.$selectedItemElement) {

        closeItem(this.$selectedItemElement, function(){
          deselectItem(_this.$selectedItemElement, function() {
            if (isNegativeIndexTransition) {
              scrollListToIndex(function() {
                updateSelectedItem();
                selectItem(_this.$selectedItemElement, function() {
                  openItem(_this.$selectedItemElement, function() {
                    itemReady();
                  });
                });
              });
            } else {
              updateSelectedItem();
              openItem(_this.$selectedItemElement, function() {
                scrollListToIndex(function() {
                  itemReady();
                });
              });
            }
          });
          if (!isNegativeIndexTransition) {
            selectItem($(_this.$listElement.find('li.list-item')[index]));
          }
        });

      } else {
        updateSelectedItem();
        selectItem(this.$selectedItemElement, function() {
          openItem(_this.$selectedItemElement, function() {
            itemReady();
          });
        });
      }

    };

    return List;

});
