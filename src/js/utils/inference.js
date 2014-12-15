/*global define */

// Speech inference

define(
  ['underscore', 'utils/pubsub', 'utils/interpreter'],
  function(_, pubsub, Interpreter) {

  var Inference = function () {
    this.navigation_commands = ['home', 'next', 'previous', 'more', 'back'];
    this.interpreter = new Interpreter();
    this.interpreter.interpret(this.tokenize('what is the weather in cardiff'));
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

  /**
   * @return { boolean } Is a given word a nav command
   */
  Inference.prototype.is_navigation_command = function (word) {
    return _.contains(this.navigation_commands, word);
  };

  /**
   * When a user says something, react by firing the correct event from here
   *
   * @phrase { string } a user speech input
   */
  Inference.prototype.react = function (phrase) {
    console.log('USER SAID ' + phrase);
    var normalized = phrase.toLowerCase().trim();
    var tokens = this.tokenize(phrase);
    // Simple reserved action phrase like home, next, prev etc
    if (tokens.length == 1 && this.is_navigation_command(phrase)) {
      pubsub.emitEvent('voice:' + phrase, []);
    // A more complex route command
    } else {
      var routeCommand = this.interpreter.interpret(phrase);
      pubsub.emitEvent('voice:route', routeCommand);
    }
  };

  return Inference;
});
