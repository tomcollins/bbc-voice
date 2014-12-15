/*global define */

define([], function() {

  var Inference = function () {
    this._words = {
      apps: ["news", "weather"],
      reserved_words: ["home", "next", "prev", "more", "back"]
    };
  };

  Inference.prototype.tokenize = function (input) {
    return input.split(/\s+/);
  };

  Inference.prototype.is_app_word = function (word) {

  };

  Inference.prototype.is_reserved_word = function (word) {

  };

  Inference.prototype.phraseHandler = function (phrase) {

  };

  return Inference;
});
