/*!
 *
 */
define(function(require, exports, module) {
  'use strict';

  var $gifSlider = $('.dl_slideshow.gifs');
  var $wallpaperSlider = $('.dl_slideshow.wallpapers');

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

});
