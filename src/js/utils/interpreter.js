/*global define */

  var Interpreter = function () {
    this.apps = ['news', 'weather'];
    this.dates = ['today', 'tomorrow'];
  };

  // Linear search
  Interpreter.prototype.contains = function (xs, x) {
    for (var i=0; i<xs.length; i++) {
      if (xs[i] == x) return true;
    }
    return false;
  };

  // Routes
  // /weather/:location
  // /news/:topic
  /**
   * @param { array[string] } tokens
   */
  Interpreter.prototype.interpret = function (tokens) {
    return ['news', 'technology'];
  };

define(['underscore'], function(_) {

  return Interpreter;
});
