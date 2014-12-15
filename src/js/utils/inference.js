/*global define */

// Speech inference

define(['underscore', 'utils/pubsub'], function(_, pubsub) {

  var Inference = function () {
    this._words = {
      apps:
        ['news', 'weather'],
      reserved_words:
        ['home', 'next', 'prev', 'more', 'back'],
      date:
        ['today', 'tomorrow', 'monday', 'tuesday', 'wednesday'],
      locations:
        ['cardiff', 'london']
    };
  };

  /**
   * Converts a string into a sequence of tokens
   * @return { array } tokens
   */
  Inference.prototype.tokenize = function (input) {
    return _.map(input.split(/\s+/), function (word) {
      return word.toLowerCase();
    });
  };

  // Predicate functions

  /**
   * @return { boolean } Is a given word an application identifier
   */
  Inference.prototype.app_word = function (word) {
    return _.contains(this._words.apps, word);
  };

  /**
   * @return { boolean } Is a given word reserved
   */
  Inference.prototype.reserved_word = function (word) {
    return _.contains(this._words.reserved_words, word);
  };

  /**
   * When a user says something, react by firing the correct event from here
   *
   * @phrase { string } a user speech input
   */
  Inference.prototype.react = function (phrase) {
    var normalized = phrase.toLowerCase().trim();
    var tokens = this.tokenize(phrase);

    // Reserved words like home, next, prev etc
    if (tokens.length == 1 && this.reserved_word(phrase)) {
      pubsub.emitEvent('voice:' + phrase, []);
    } else {
      pubsub.emitEvent('voice:command', [tokens]);
    }
  };

  return Inference;
});
