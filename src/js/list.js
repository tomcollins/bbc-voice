/* global require */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery' : '/vendor/jquery/dist/jquery',
    'underscore' : '/vendor/underscore/underscore',
    'backbone' : '/vendor/backbone/backbone',
    'handlebars' : '/vendor/handlebars/handlebars',
    'eventemitter' : '/vendor/eventEmitter/EventEmitter.min'
  }
});

require(['jquery', 'utils/pubsub', 'ui/list', 'ui/list/item/news'], function($, pubsub, List, ListItemNews) {

  var list = new List();
  list.addItem(new ListItemNews({
    title: 'List item number one'
  }));
  list.addItem(new ListItemNews({
    title: 'List item number two'
  }));
  list.addItem(new ListItemNews({
    title: 'List item number three'
  }));
  list.addItem(new ListItemNews({
    title: 'List item number four'
  }));
  list.addItem(new ListItemNews({
    title: 'List item number five'
  }));
  list.render($('#list'));

  pubsub.addListener('list:show:complete', function() {
    list.setIndex(0);
  });
  pubsub.addListener('list:item:active:complete', function(listItem, index) {
    //console.log('listItem', listItem);
    setTimeout(function(){
      //if (index === 2) {
      //  list.setIndex(1);
      //} else {
        list.next();
      //}
    }, 2500);
  });

  $('#list').on('click', function() {
    pubsub.removeAllListeners('list:item:active:complete');
    list.hide();
  });


  list.show();

});


