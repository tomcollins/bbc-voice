/*global define */

define(['underscore'], function(_) {

  var Inference = function () {
    this._words = {
      apps: ["news", "weather"],
      reserved_words: ["home", "next", "prev", "more", "back"]
    };
  };

  Inference.prototype.tokenize = function (input) {
    return _.map(input.split(/\s+/), function (word) {
      return word.toLowerCase();
    });
  };

  Inference.prototype.is_app_word = function (word) {
    return _.contains(this._words.apps, word);
  };

  Inference.prototype.is_reserved_word = function (word) {

  };

  Inference.prototype.phraseHandler = function (phrase) {

  };

  return Inference;
});
