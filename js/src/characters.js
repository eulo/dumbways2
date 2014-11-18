/*!
 *
 *
 * TODO: Refactor
 */
define(function(require, exports, module) {
  'use strict';

  $('.character').each(function() {
    var $this = $(this)
      , data = $this.data()
      , pos = 0
      , dir = true;

    $this.css({
      'background-image': 'url(' + data.file + ')',
      'width': data.width + 'px',
      'height': data.height + 'px' 
    });

    var img = new Image();
    img.onload = function() {
      data.maxHeight = this.height;

      setInterval(function() {

        if (pos - data.height <= 0) {
          dir = true;
        } else if (pos + data.height >= data.maxHeight )
          dir = false;

        if (dir)
          pos += data.height;
        else 
          pos -= data.height;

        $this.css({
          'background-position': '0px ' + pos + 'px'
        }); 
      }, 1000 / data.fps);
    };
    img.src = data.file;
  });
});
