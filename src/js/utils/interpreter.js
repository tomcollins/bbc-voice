/*global require define */

var Interpreter = function () {

  this.apps      = ['news', 'weather'];
  this.dates     = ['today', 'tomorrow'];
  this.days      = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  this.locations = ['cardiff', 'london'];

  this.news_topics = [
    'technology',
    'entertainment',
    'sport',
    'politics'
  ];

  this.all_words = [this.apps,this.dates,this.locations,this.days];
  this.word_list = [].concat.apply([], this.all_words);
};

/**
 * Check if a word is a known word
 * @return { boolean } is this a known word
 */
Interpreter.prototype.is_known_word = function (word) {
  return this.linear_search(this.word_list, word);
};

/**
 * Check if a sequence xs contains a token x
 */
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

// show me the weather in cardiff
Interpreter.prototype.filter_tokens = function (tokens) {
  var result = [];
  for (var i=0; i<tokens.length; i++) {
    if (this.is_known_word(tokens[i])) {
      console.log('pushing token' + tokens[i]);
      result.push(tokens[i]);
    }
  }
  console.log(result);
  return result;
};

/**
 * @param { array[string] } tokens
 */
Interpreter.prototype.interpret = function (tokens) {
  var filtered_tokens = this.filter_tokens(tokens);
  return filtered_tokens.join('/');
};

define(['underscore'], function(_) {
  return Interpreter;
});
