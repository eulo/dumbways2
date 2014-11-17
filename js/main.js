require(['config'], function() {
    require(['app'], function() {

      $('.share.fb').click(function(e){
        e.preventDefault()
        FB.ui({
          method: 'feed',
          name: 'Dumb Ways To Die 2: The Games',
            link: 'http://dumbwaystodie.com',
            caption: 'Let the training begin!',
            description: "Get ready for Dumb Ways To Die 2: The Games by checking out the new trailer!",
        }, function(response){});
        _gaq.push(['_trackEvent', 'share_ph2', 'facebook']);

      })
      $('a.vid_button').click(function(e){
        e.preventDefault();

        if($(this).attr('rel')){
          
          var ytCode = $(this).data('yt');
          var ytUrl = "//www.youtube.com/embed/"+ytCode+"?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1";

          var el = '.dumbotron-inline.'+$(this).attr('rel');
          $(el).find('iframe').attr('src',ytUrl);
          $('.dumbotron-inline').not('.'+$(this).attr('rel')).slideUp('fast')
          $(el).slideDown('fast').find('h2').slideDown('fast')
          $(".section").not('.'+$(this).attr('rel')).slideDown('fast')
          $(".section."+$(this).attr('rel')).slideUp('fast')
          var s = setTimeout(function(){
            //$.scrollTo(el,500)
            scrollTo(el,500)
          }, 200);
          _gaq.push(['_trackEvent', 'watch vid', $(this).attr('rel')]);
        }
      })
      $('.dumbotron-inline a.close').click(function(e){
        e.preventDefault();
        if($(this).attr('rel')){
          $('.dumbotron-inline.'+$(this).attr('rel')).slideUp('fast').find('h2').slideUp('fast')
          $('.dumbotron-inline.'+$(this).attr('rel')+" iframe").attr('src','')
          $(".section."+$(this).attr('rel')).slideDown('fast')
        }
      })
      $('#char3, #title, #vidplay').click(function(e) {
            e.preventDefault();
          //$.scrollTo("#social", 1200);
          scrollTo("#social", 1200);
        _gaq.push(['_trackEvent', 'button', 'play video']);

      });
      $(window).load(function(){
        $("#chars, #stage").addClass('animate');
        setInterval(showtime,700);
        setInterval(showtime,500);
        setInterval(showtime,900);
        setInterval(showtime,1100);
      })

      $('#subForm').submit(function (e) {
        e.preventDefault();
        $.getJSON(
        this.action + "?callback=?",
        $(this).serialize(),
        function (data) {
          if (data.Status === 400) {
            alert("Error: " + data.Message);
          } else { // 200
            alert("Thank you, your email has been added to our list. You’ll be one of the first to receive updates regarding our online shop.");
            //alert("Success: " + data.Message);
          }
        });
      });

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

      function scrollTo(el, time) {
        var target = $(el);
        //target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 50
          }, time);
        }
      }

  });
});
