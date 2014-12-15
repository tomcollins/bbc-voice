'use strict';

module.exports = function() {
  return {
    options: {
      livereload: true
    },
    gruntfile: {
      files: '<%= config.gruntfile %>',
      tasks: ['jshint:gruntfile']
    },
    build: {
      files: '<%= config.buildfiles %>',
      //tasks: ['jshint:build']
    },
    js: {
      files: [],
      Xfiles: [
        '<%= config.paths.js %>/**/*.js',
        '<%= config.paths.test %>/**/*.js'
      ],
      //tasks: ['jshint:app', 'jscs'/*, 'test:cli'*/]
    }
  };
};
