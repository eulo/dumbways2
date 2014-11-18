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

    if (data.animate === false) {
      return;
    }
    // css animation
    setTimeout(function(){
      //$this.addClass(data.class);
    }, Math.random() * 1000);

    var img = new Image();
    img.onload = function() {
      if (data.json) {
        // json data
        $.get(data.json).done(function(res) {
          var i = 0
            , l = res.frames.length
            , dir = true;

          setInterval(function() {
            $this.css({
              'width': res.frames[i].frame.w + 'px',
              'height': res.frames[i].frame.h + 'px',
              'background-position': -res.frames[i].frame.x + 'px ' + -res.frames[i].frame.y +'px'
            }); 
            if (data.alternate === true) {
              if (dir === true && i + 1 >= l) {
                dir = false;
              } else if (dir === false && i - 1 < 0) {
                dir = true;
              }
              i = dir ? i + 1 : i - 1;
            } else {
              i++;
              if (i >= l) 
                i = 0; 
            }
          }, 1000 / data.fps );
        });

      } else {
        // simple animation
        data.maxHeight = this.height;

        setTimeout(function() {
          setInterval(function() {

            if (pos - data.height <= 0) {
              if (data.reverse === true)
                pos = data.maxHeight + data.height;
              else
                dir = true;
            } else if (pos + data.height >= data.maxHeight ) {
              if (data.reverse === false)
                pos = 0 - data.height;
              else
                dir = false;
            }

            if (dir)
              pos += data.height;
            else 
              pos -= data.height;

            $this.css({
              'background-position': '0px ' + -pos + 'px'
            }); 
          }, 1000 / data.fps);
        }, Math.random() * 1000);
      }
    };
    img.src = data.file;
  });
});
