'use strict';

module.exports = function() {
  return {
    serve: [
      '<%= config.paths.css %>'
    ],
    dist: [
      '<%= config.paths.dist %>/**/*'
    ]
  };
};
