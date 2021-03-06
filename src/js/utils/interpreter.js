/*global require define */

var stop_words = [
'a',
'about',
'above',
'after',
'again',
'against',
'all',
'am',
'an',
'and',
'any',
'are',
'as',
'at',
'be',
'because',
'been',
'before',
'being',
'below',
'between',
'both',
'but',
'by',
'could',
'did',
'do',
'does',
'during',
'each',
'few',
'for',
'from',
'further',
'had',
'has',
'have',
'having',
'he',
'her',
'here',
'his',
'how',
'i',
'if',
'in',
'into',
'is',
'it',
'its',
'itself',
'like',
'me',
'more',
'most',
'my',
'myself',
'need',
'no',
'nor',
'not',
'of',
'off',
'on',
'once',
'only',
'or',
'other',
'ought',
'our',
'out',
'over',
'own',
'same',
'show',
'she',
'should',
'so',
'some',
'such',
'tell',
'than',
'that',
'the',
'their',
'theirs',
'them',
'themselves',
'then',
'there',
'these',
'they',
'this',
'those',
'through',
'to',
'too',
'under',
'until',
'up',
'very',
'was',
'want',
'we',
'were',
'what',
'when',
'where',
'which',
'who',
'why',
'with',
'would',
'you',
'your',
'yours',
'yourself',
'yourselves'];

var Interpreter = function () {
  this.apps      = ['news', 'weather'];
  this.stop_words = stop_words;
};

/**
 * Check if a sequence xs contains a token x
 */
Interpreter.prototype.contains_token = function (xs, x) {
  for (var i=0; i<xs.length; i++) {
    if (xs[i] == x) return true;
  }
  return false;
};

/**
 * Check if a word is a stop i.e junk word
 * @return { boolean } is this a sto word
 */
Interpreter.prototype.is_stop_word = function (word) {
  return this.contains_token(this.stop_words, word);
};

/**
 * Check if a sequence xs contains a token x
 */
Interpreter.prototype.contains_token = function (xs, x) {
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


Interpreter.prototype.remove_token = function(tokens, token) {
  return tokens.filter( function (t) { return t !== token; });
};

/** Normalize token input by filtering out the crap */
Interpreter.prototype.filter_stop_words = function (tokens) {
  var result = [];
  for (var i=0; i<tokens.length; i++) {
    var token = tokens[i];
    if (!this.is_stop_word(token)) {
      result.push(token);
    }
  }
  return result;
};

/**
 * @param { array[string] } tokens
 */
Interpreter.prototype.interpret = function (tokens) {

  var normalized_tokens = this.filter_stop_words(tokens);

  if (this.contains_token(tokens, 'umbrella')) {
    var umbrella_tokens = this.remove_token(normalized_tokens, 'umbrella');
    return '/weather/' + umbrella_tokens.join('/') + '/umbrella';
  }

  // news custom logic. Re-arrange news route to put news first
  if (this.contains_token(tokens, 'news')) {
    var news_tokens = this.remove_token(normalized_tokens, 'news');
    if (news_tokens.length > 0) {
      return '/news/' + news_tokens.join('/');
    } else {
      return '/news';
    }
  }

  // Put weather at the start of the route if phrase === cardiff weather
  if (this.contains_token(tokens, 'weather')) {
    var weather_tokens = this.remove_token(normalized_tokens, 'weather');
    return '/weather/' + weather_tokens.join('/');
  }

  return '/' + normalized_tokens.join('/');
};

function tests ( ) {
  var i = new Interpreter();
  var a = 'business news';
  var b = 'show me news about the uk';
  var c = 'tell me the weather in cardiff';
  var d = 'what is the weather in london tomorrow';
  var e = 'news politics';
  var f = 'show me cardiff weather';
  var g = 'do i need my umbrella in cardiff tomorrow';
  return [a,b,c,d,e,f,g].map(function (x) {
    return i.interpret(x.split(' '));
  });
}

define(['underscore'], function(_) {
  return Interpreter;
});
