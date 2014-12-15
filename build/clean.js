'use strict';

module.exports = function() {
  return {
    serve: [],
    dist: [
      '<%= config.paths.dist %>/**/*'
    ]
  };
};
