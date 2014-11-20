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

    if ($this.css('display') === 'none')
      return;

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
    }, Math.random() * 4000);

    var img = new Image();
    img.onload = function() {
      if (data.json) {
        // json data
        $.get(data.json).done(function(res) {
          var i = 0
            , l = res.frames.length
            , dir = true
            , frun = true
            , pause
            , interval;

          if (data.framestall === void 0 || data.framestall !== 1) {
            interval = setInterval(function() {
              $this.css({
                'width': res.frames[i].frame.w + 'px',
                'height': res.frames[i].frame.h + 'px',
                'background-position': -res.frames[i].frame.x + 'px ' + -res.frames[i].frame.y +'px'
              }); 
              // If dimensions of image change during animation
              if (data.dimchange !== void 0)
                $this.css({
                'left': res.frames[i].spriteSourceSize.x + 'px',
                'top': res.frames[i].spriteSourceSize.y  + 'px'
                });

              if (data.alternate === true) {
                if (dir === true && i + 1 >= l || (data.framestall !== void 0 && i + 1 >= data.framestall)) {
                  dir = false;
                } else if (dir === false && i - 1 < 0 && !frun) {
                  // trigger pause
                  if (data.pause !== void 0 && --pause > 0) {
                    return; 
                  }
                  dir = true;
                }
                i = dir ? i + 1 : i - 1;
              } else {
                i++;
                if (i >= l || (data.framestall !== void 0 && i >= data.framestall)) 
                  i = 0; 
              }
              if (data.pause !== void 0)
                pause = data.pause * data.fps;
              frun = false;
            }, 1000 / data.fps );
          } else {
            // Init first frame
            $this.css({
              'width': res.frames[i].frame.w + 'px',
              'height': res.frames[i].frame.h + 'px',
              'background-position': -res.frames[i].frame.x + 'px ' + -res.frames[i].frame.y +'px'
            }); 
            if (data.dimchange !== void 0)
              $this.css({
              'left': res.frames[i].spriteSourceSize.x + 'px',
              'top': res.frames[i].spriteSourceSize.y  + 'px'
              });
          }

          if (data.framestall !== void 0) {
            $this.click(function(event) {
              $this.unbind('click');
              clearInterval(interval);
              interval = setInterval(function() {
                $this.css({
                  'width': res.frames[i].frame.w + 'px',
                  'height': res.frames[i].frame.h + 'px',
                  'background-position': -res.frames[i].frame.x + 'px ' + -res.frames[i].frame.y +'px'
                }); 
                // If dimensions of image change during animation
                if (data.dimchange !== void 0) {
                  $this.css({
                  'left': res.frames[i].spriteSourceSize.x + 'px',
                  'top': res.frames[i].spriteSourceSize.y  + 'px'
                  });
                }
                // Check to see if animation as finished
                if (++i >= l) {
                  clearInterval(interval);
                  if (data.callback !== void 0)
                    $this.addClass(data.callback);
                }

              }, 1000 / data.fps);
            });
          }
          // Animate css3
          $this.addClass(data.class);
        });

      } else {
        // simple animation
        data.maxHeight = this.height;
        
        var interval
          , frun = true
          , pause;
        

        // Do animation
        setTimeout(function() {
          if (data.framestall === void 0 || data.framestall !== 1) {
            interval = setInterval(function() {

              if (pos - data.height < 0 && !frun) {
                if (data.reverse === true)
                  pos = data.maxHeight + data.height;
                else {
                  dir = true;
                  if (data.pause !== void 0 && --pause > 0) {
                    return;    
                  }
                }
              } else if (pos + data.height >= data.maxHeight || (data.framestall !== void 0 && pos + data.height >= data.height * data.framestall) ) {
                if (data.reverse === false)
                  pos = 0 + data.height;
                else
                  dir = false;
              }
              // set pause countdown if applicable
              if (data.pause !== void 0)
                pause = data.pause * data.fps;
              frun = false;

              if (dir)
                pos += data.height;
              else 
                pos -= data.height;

              $this.css({
                'background-position': '0px ' + -pos + 'px'
              }); 
            }, 1000 / data.fps);
          }
          // Animate css3
          $this.addClass(data.class);
          // Make clickable
          if (data.framestall !== void 0) {
            $this.click(function(event) {
              $this.unbind('click');
              clearInterval(interval);
              interval = setInterval(function() {
                pos += data.height; 
                $this.css({
                  'background-position': '0px ' + -pos + 'px'
                }); 
                // If end of animation, stop
                if (pos + data.height >= data.maxHeight) {
                  clearInterval(interval);

                  $this.removeClass(data.class);
                }

              }, 1000 / data.fps);
            });
          }

        }, Math.random() * 2500);
      }
    };
    img.src = data.file;
  });
});
