'use strict';

module.exports = function(grunt) {

  //var rewriteRulesSnippet = require('grunt-connect-route/lib/utils').rewriteRequest;

  return {
    connect: {
      options: {
          port: 9001,
          hostname: 'localhost'
          //base: '<%= config.paths.app %>'
      },
      rules: {
        '^/css/(.*)$': '/src/css/$1',
        '^/fonts/(.*)$': '/src/fonts/$1',
        '^/js/(.*)$': '/src/js/$1',
        '^/foo(.*)$': '/src/index.html'
        
      }
    }
  };
};
