/*!
 *
 */
define(function(require, exports, module) {
  'use strict';

  var $gifSlider = $('.dl_slideshow.gifs');
  var $wallpaperSlider = $('.dl_slideshow.wallpapers');

  var videoSlider = function($cont, $player) {
    // Get videos from youtubez
    var channelId = 'UC7lZ_iOz3NhA6krGfILerQA'
      , APIkey = 'AIzaSyA9kAtDyW3lzwCIBYIUjnGXITtw2fDdDVY'
      , feature = 'IJNR2EpS0jw'
      //, feature = 'eq-GYfRjxhM'
      , $list = $cont.find('ul')
      , $li, $a, vidC = 0;
    // Output vid func
    var outputVideo = function(id) {
      $li = $('<li></li>')
      $a = $('<a href="#"></a>');
      $a.attr('data-analytics', '["video", "play", "video ' +(++vidC)+ '"]'); 
      $a.attr('data-video', id);
      $a.attr('data-index', vidC);
      $a.append('<img src="http://img.youtube.com/vi/' + id + '/hqdefault.jpg">');
      $li.append($a);
      $list.append($li);
    }; 
    // Make sure feature is always first
    outputVideo(feature);

    $.get('https://www.googleapis.com/youtube/v3/search?key='+APIkey+'&channelId='+channelId+'&part=snippet,id&order=date&maxResults=20')
    .done(function(res) {
      if (res.items === void 0)
        return;
      
      for (var i = 0, l = res.items.length; i < l; i++) {
        if (res.items[i].id.videoId !== void 0 && res.items[i].id.videoId !== feature)
          outputVideo(res.items[i].id.videoId);   
      }
      $list.find('li a').first().addClass('active');
    });

    // Bind video carousel nav
    $cont.find('.next, .prev').click(function(event) {
      event.preventDefault();
      var next = $(this).hasClass('next')
        , i = next ? -1 : 1
        , di = 0
        , l = $cont.find('li a').length
        , s = next ? l : 1;

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
    // Play videos onclick
    $cont.on('click', 'li a', function(event) {
      event.preventDefault();
      var url = "//www.youtube.com/embed/"+$(this).data('video')+"?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1"
      $("#vidplayer iframe").attr('src',url);
      $cont.find('li a').removeClass('active');
      $(this).addClass('active');
    });
  }
  var videoSliderMob = function($cont) {
      var yt_ids = [];
      var i = 0;
      $('.vid_links li a').each(function(){
          yt_ids.push($(this).data('video'))
      })
      $cont.find('.next, .prev').click(function(event) {
        event.preventDefault();
        
        if($(this).hasClass('next')){
          i++;
          if(i == yt_ids.length ){
            i = 0;
          }
        }else{
          i--
          if(i < 0){
            i = yt_ids.length - 1;
          }
        }
        var url = "//www.youtube.com/embed/"+yt_ids[i]+"?rel=0&amp;controls=1&amp;showinfo=0"
        $("#vidplayer iframe").attr('src',url);
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
  videoSliderMob($('#vidplayer'));
});
