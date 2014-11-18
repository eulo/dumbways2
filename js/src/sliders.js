/*!
 *
 */
define(function(require, exports, module) {
  'use strict';

  var $gifSlider = $('.dl_slideshow.gifs');
  var $wallpaperSlider = $('.dl_slideshow.wallpapers');

  var videoSlider = function($cont, $player) {
    $cont.find('.next, .prev').click(function(event) {
      event.preventDefault();
      var next = $(this).hasClass('next')
        , i = next ? 1 : -1
        , di = 0
        , l = $cont.find('li a').length
        , s = next ? 1 : l;

      $cont.find('li a').each(function() {
        di = $(this).data('index') + i;

        if (di < 1 || di > l)
          di = s;
          
        $(this).attr('data-index', di)
          .data('index', di)
          .addClass('force-repaint')
          .removeClass('force-repaint');
      });

    });

    $cont.find('li a').click(function(event) {
      event.preventDefault();
      $cont.find('li a').removeClass('active');
      $(this).addClass('active');
    });
  }

  var initSlider = function($cont) {
    var i = 0;
    $cont.find('li').each(function() {
      $(this).css({
        'left': (i * 172) + (40 * i++) + 'px'
      });
    });

    var m = 0;
    $cont.find('.next, .prev').click(function(event) {
      event.preventDefault();
      if ($(this).hasClass('next'))
        i = ++m;
      else 
        i = --m;
      $cont.find('li').each(function() {
        $(this).css({
          left: (i * 172) + (40 * i++) + 'px'
        });
      });

      if ($(this).hasClass('next') && m === 1) {
        $cont.find('ul').prepend($cont.find('li').last().css({
          left: (-1 * 172) + (40 * -1) + 'px'  
        }));
        // Animation queue hack
        setTimeout(function() {
          $cont.find('li').first().css({
            left: 0
          });
        }, 0);
        m = 0;
      } else if ($(this).hasClass('prev') && i === 3) {
        $cont.find('ul').append($cont.find('li').first().css({
          left: (4 * 172) + (40 * 4) + 'px'
        }));
        // Animation queue hack
        setTimeout(function() {
          $cont.find('li').last().css({
            left: (3 * 172) + (40 * 3) + 'px'
          });
        }, 0);
        m++;
      }
    });

  };

  initSlider($gifSlider);
  initSlider($wallpaperSlider);
  videoSlider($('.vid_links'), $('#vidplayer'));

});
