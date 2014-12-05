/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('./build/config.json'),
    jshint: require('./build/jshint')(grunt),
    karma: require('./build/karma')(grunt),
    less: require('./build/less')(grunt),
    recess: require('./build/recess')(grunt),
    connect: require('./build/connect')(grunt),
    open: require('./build/open')(grunt),
    watch: require('./build/watch')(grunt),
    concurrent: require('./build/concurrent')(grunt),
    uglify: require('./build/uglify')(grunt),
    clean: require('./build/clean')(grunt),
    jscs: require('./build/jscs')(grunt),
    copy: require('./build/copy')(grunt),
    cssmin: require('./build/cssmin')(grunt),
    requirejs: require('./build/require')(grunt),
    imagemin: require('./build/imagemin')(grunt),
    sprite: require('./build/sprites')(grunt)
  });

  grunt.registerTask('sprites', ['sprite', 'imagemin']);
  grunt.registerTask('barlesque', 'Downloads Barlesque templates from API', require('./build/barlesque')(grunt));
  grunt.registerTask('template', 'Generate index.html from templates', require('./build/template')(grunt));
  grunt.registerTask('css', ['less', 'recess']);
  grunt.registerTask('test', ['connect:test', 'watch']);
  grunt.registerTask('test:cli', ['karma:run']);
  grunt.registerTask('test:ci', ['karma:ci']);
  grunt.registerTask('serve', ['clean:serve', 'concurrent:template', 'connect:server', 'watch']);
  grunt.registerTask('build', ['clean:serve', 'concurrent:lint', 'concurrent:template', 'test:cli']);
  grunt.registerTask('dist', ['build', 'clean:dist', 'copy:js', 'copy:css', 'cssmin', 'uglify', 'requirejs']);


  grunt.registerTask('default', ['serve']);
};