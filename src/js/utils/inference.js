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
      return word.toLowerCase().trim();
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

    var tokens = this.tokenize(phrase);

    if (tokens[0] === 'bbc') {
      tokens = tokens.slice(1);

      // Send a general voice trigger command with all the tokens
      pubsub.emitEvent('voice:trigger', tokens);

      // Simple reserved action phrase like home, next, prev etc
      if (tokens.length == 1 && this.is_navigation_command(phrase)) {
        var event = 'voice:' + phrase;
        console.log('TRIGGERING EVENT: ' + event);
        pubsub.emitEvent(event, []);
        // A more complex route command
      } else {
        var routeCommand = this.interpreter.interpret(tokens);
        console.log('TRIGGERING EVENT: ' + routeCommand);
        pubsub.emitEvent('voice:route', routeCommand);
      }
    }
  };

  return Inference;
});
