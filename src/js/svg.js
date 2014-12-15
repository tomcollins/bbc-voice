/* global require */

'use strict';

require.config({
  baseUrl: '/js',
  paths: {
    'jquery' : '/vendor/jquery/dist/jquery'
  }
});

require(['jquery'], function($) {

  var loader = new SVGLoader(
    document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout }
  );

  function change() {
    loader.show();
    setTimeout( function() {
      loader.hide();
      $('#page-1').addClass('hide');
      $('#page-2').removeClass('hide');
    }, 2000 );
  }

  $('#page-2').addClass('hide');
  $('#page-1 p').on('click', function(){
    change();
  });

});


