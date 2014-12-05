// Karma configuration
// Generated on Wed Jun 25 2014 20:57:42 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'test/main.js',
      {pattern: 'src/js/**/*.js', included: false},
      {pattern: 'src/vendor/events/**/*.js', included: false},
      {pattern: 'src/vendor/jquery/dist/**/*.js', included: false},
      {pattern: 'src/vendor/locservices-core-js/src/**/*.js', included: false},
      {pattern: 'test/specs/**/*.js', included: false},
      {pattern: 'test/fixtures/**/*.js', included: false}
    ],

    // list of files to exclude
    exclude: [
      'src/js/app.js',
      'src/examples/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['story'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
