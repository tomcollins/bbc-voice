define(['jquery', 'utils/pubsub'],
  function($, pubsub) {

    var classListItemSelected = 'list-item-selected',
      classListSelectionInactive = 'list-selection-inactive';

    var List = function() {
      this.items = [];
    };

    List.prototype.addItem = function(data) {
      this.items.push({
        label: data.title,
        subLabel: '2 hours ago',
        data: data
      });
    };

    List.prototype.render = function($element) {
      var _this = this;
      var html = '<ul class="list"><span class="list-selection ' +classListSelectionInactive +'"></span>';
      this.items.forEach(function(item, index) {
        html += '<li class="list-item" data-list-item-index="' +index +'">'
          + '<p class="list-item-label">' +item.label +'</p>'
          + '<p class="list-item-sub-label">' +item.subLabel +'</p>'
          + '</li>';
      });
      html += '</ul>';
      $element.append(html);
      this.$list = $element.find('.list');
      this.$selection = $element.find('.list-selection');

      this.$list.on('click', 'li', function(e) {
        var index = $(e.currentTarget).data('list-item-index');
        _this.setIndex(index);
      })
    };

    List.prototype.next = function() {
      if (undefined === this.index) {
        return;
      }
      this.setIndex(this.index +1);
    };

    List.prototype.setIndex = function(index) {
      if (index <0) {
        return;
      }
      if (index >= this.items.length) {
        index = 0;
      }
      this.index = index;
      this.$list.find('.' +classListItemSelected).removeClass(classListItemSelected);
      $(this.$list.find('li')[index]).addClass(classListItemSelected);
      this.$selection.removeClass(classListSelectionInactive);
      this.$selection.removeClass('list-selection-transition-0 list-selection-transition-1 list-selection-transition-2');
      this.$selection.addClass('list-selection-transition-' +index);

      pubsub.emitEvent('list:select', [this.items[index].data]);
    };

    return List;

});
