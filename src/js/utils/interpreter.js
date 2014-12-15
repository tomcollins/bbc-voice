/*global require define */

var Interpreter = function () {
  this.apps      = ['news', 'weather'];
  this.dates     = ['today', 'tomorrow'];
  this.locations = ['cardiff', 'london'];
  this.news_topics = [
    'technology',
    'entertainment',
    'sport',
    'politics'
  ];
};

// Linear search
Interpreter.prototype.linear_search = function (xs, x) {
  for (var i=0; i<xs.length; i++) {
    if (xs[i] == x) return true;
  }
  return false;
};


/**
 * Returns true if xs and ys share any common item
 */
Interpreter.prototype.union_search = function (xs, ys) {
  for (var i=0; i<xs.length; i++) {
    for (var j=0; j<ys.length; j++) {
      if (xs[i] === ys[j]) {
        return true;
      }
    }
  }
  return false;
};

/** Returns true if tokens contains a news topic */
Interpreter.prototype.contains_news_topic = function (tokens) {
  return this.union_search(this.news_topics, tokens);
};

/**
 * @param { array[string] } tokens
 */
Interpreter.prototype.interpret = function (tokens) {
  return tokens.join('/');
};

define(['underscore'], function(_) {
  return Interpreter;
});
