/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('./build/config.json'),
    connect: require('./build/connect')(grunt),
    concurrent: require('./build/concurrent')(grunt),
    copy: require('./build/copy')(grunt),
    watch: require('./build/watch')(grunt),
    clean: require('./build/clean')(grunt),
    jshint: require('./build/jshint')(grunt),
    jscs: require('./build/jscs')(grunt),
    less: require('./build/less')(grunt),
    recess: require('./build/recess')(grunt)
    /*
    uglify: require('./build/uglify')(grunt),
    karma: require('./build/karma')(grunt),
    open: require('./build/open')(grunt),
    cssmin: require('./build/cssmin')(grunt),
    requirejs: require('./build/require')(grunt),
    imagemin: require('./build/imagemin')(grunt),
    sprite: require('./build/sprites')(grunt)*/
  });

  grunt.registerTask('css', ['less'/*, 'recess'*/]);
  //grunt.registerTask('sprites', ['sprite', 'imagemin']);
  //grunt.registerTask('test', ['connect:test', 'watch']);
  //grunt.registerTask('test:cli', ['karma:run']);
  //grunt.registerTask('test:ci', ['karma:ci']);
  grunt.registerTask('serve', ['clean:serve', 'css', 'connect:server', 'watch']);
  grunt.registerTask('build', ['clean:serve', 'concurrent:lint'/*, 'test:cli'*/]);
  grunt.registerTask('dist', ['build', 'clean:dist', 'copy:js', 'copy:css', 'cssmin', 'uglify', 'requirejs']);


  grunt.registerTask('default', ['serve']);
};