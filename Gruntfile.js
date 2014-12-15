/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
          port: 9001,
          hostname: 'localhost'
      },
      rules: [
        {from: '^/css(.*)$', to: '/src/css/$1'},
        {from: '^/js(.*)$', to: '/src/js/$1'},
        {from: '^/fonts(.*)$', to: '/src/fonts/$1'},
        {from: '^/index_dev.html$', to: '/src/index.html'},
        {from: '^/(.*)$', to: '/src/index.html'}
      ],
      development: {
        options: {
            middleware: function (connect, options) {
                var middlewares = [];

                // RewriteRules support
                middlewares.push(rewriteRulesSnippet);

                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }

                var directory = options.directory || options.base[options.base.length - 1];
                options.base.forEach(function (base) {
                    // Serve static files.
                    middlewares.push(connect.static(base));
                });

                // Make directory browse-able.
                middlewares.push(connect.directory(directory));

                return middlewares;
            }
        }
      }
    },
    watch: {
      gruntfiles: {
        files: ['Gruntfile.js']
      },
      js: {
        files: ['src/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');

  grunt.registerTask('serve', function (target) {
      grunt.task.run([
          'configureRewriteRules',
          'connect:development',
          'watch'
      ]);
  });


  //grunt.registerTask('css', ['less'/*, 'recess'*/]);
  //grunt.registerTask('sprites', ['sprite', 'imagemin']);
  //grunt.registerTask('test', ['connect:test', 'watch']);
  //grunt.registerTask('test:cli', ['karma:run']);
  //grunt.registerTask('test:ci', ['karma:ci']);
  //grunt.registerTask('serve', ['connect', 'watch']);
  //grunt.registerTask('build', ['concurrent:lint'/*, 'test:cli'*/]);
  //grunt.registerTask('dist', ['build', 'copy:js', 'copy:css', 'cssmin', 'uglify', 'requirejs']);

  grunt.registerTask('default', ['serve']);
};