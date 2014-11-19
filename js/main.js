require(['config'], function() {
    require(['app'], function() {

      require([
        'src/binds',
        'src/sliders',
        'src/characters'
      ]);


      $("#chars, #stage").addClass('animate');
      setInterval(showtime,700);
      setInterval(showtime,500);
      setInterval(showtime,900);
      setInterval(showtime,1100);

      var flash_count = 0;
      function showtime(){
        flash_count ++;
        var n = Math.round(Math.random()*2)+1;
        var x = Math.round(Math.random()*100);
        var y = Math.round(Math.random()*80);
        $("#hero_intro").prepend('<span class="flash'+n+'" rel="f_'+flash_count+'" style="top:'+y+'%;left:'+x+'%;"></span>')
        var r = $('span[rel="f_'+flash_count+'"]');
        setTimeout(function(){r.remove()},500)
      }

      $(window).scroll(function(event) {
          console.log($(window).scrollTop());
          $('.mountain_bg').css('transform','translate(0px,'+($(window).scrollTop()/2)+'px)')
      });
  });
});
