'use strict';

define([
  'jquery',
  'views'
  ], function() {

  var currentView = undefined;

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

  var initialize = function() {
    
  };

  return {
    init: initialize,
    setView: setView
  };
});