require(['config'], function() {
    require(['app'], function() {

      require([
        'src/binds',
        'src/sliders',
        'src/characters'
      ]);


      $("#chars, #stage, #intro .train.left-train").addClass('animate');
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
          $('.mountain_bg').css('transform','translate(0px,'+($(window).scrollTop()/2)+'px)')
      });

      window.im_a_train = function(text){
        if(text == 'caaage'){
          $('.train span').first().append('<img src="http://ih2.redbubble.net/image.14928045.9401/sticker,375x360.u6.png" style="float:right;margin-top:-80px;margin-right:-100px;"/>');
        }else{
          $('.train span').html(text);
        }
      }

      $('[data-analytics]').click(function(){
        var a = $(this).data('analytics');
        _gaq.push(['_trackEvent', a[0], a[1], a[2]]);
      });
      

      data = $.parseJSON('{"top_scores":[{"name":"Sergio Mil\u00e1n","facebook_id":null,"score":"3299"},{"name":"Harunchai Paecharoenchai","facebook_id":null,"score":"2950"},{"name":"Julius Vet\u00e4m\u00e4j\u00e4rvi","facebook_id":"10204417397067101","score":"2763"},{"name":"Колмогоров","facebook_id":null,"score":"2668"},{"name":null,"facebook_id":null,"score":"2665"},{"name":null,"facebook_id":null,"score":"2634"},{"name":null,"facebook_id":null,"score":"2565"},{"name":null,"facebook_id":null,"score":"2564"},{"name":null,"facebook_id":null,"score":"2530"},{"name":null,"facebook_id":null,"score":"2500"},{"name":null,"facebook_id":null,"score":"2488"},{"name":null,"facebook_id":null,"score":"2463"},{"name":null,"facebook_id":null,"score":"2461"},{"name":null,"facebook_id":null,"score":"2456"},{"name":null,"facebook_id":null,"score":"2452"},{"name":null,"facebook_id":null,"score":"2411"},{"name":null,"facebook_id":null,"score":"2400"},{"name":null,"facebook_id":null,"score":"2395"},{"name":null,"facebook_id":null,"score":"2378"},{"name":null,"facebook_id":null,"score":"2368"},{"name":null,"facebook_id":null,"score":"2355"},{"name":null,"facebook_id":null,"score":"2353"},{"name":null,"facebook_id":null,"score":"2350"},{"name":null,"facebook_id":null,"score":"2348"},{"name":null,"facebook_id":null,"score":"2341"},{"name":null,"facebook_id":null,"score":"2323"},{"name":null,"facebook_id":null,"score":"2318"},{"name":"Patrick Trethowan","facebook_id":"10154692830720167","score":"2314"},{"name":null,"facebook_id":null,"score":"2310"},{"name":null,"facebook_id":null,"score":"2301"},{"name":null,"facebook_id":null,"score":"2300"},{"name":null,"facebook_id":null,"score":"2298"},{"name":null,"facebook_id":null,"score":"2287"},{"name":null,"facebook_id":null,"score":"2273"},{"name":null,"facebook_id":null,"score":"2270"},{"name":null,"facebook_id":null,"score":"2269"},{"name":null,"facebook_id":null,"score":"2265"},{"name":null,"facebook_id":null,"score":"2261"},{"name":null,"facebook_id":null,"score":"2261"},{"name":null,"facebook_id":null,"score":"2261"},{"name":null,"facebook_id":null,"score":"2261"},{"name":null,"facebook_id":null,"score":"2259"},{"name":null,"facebook_id":null,"score":"2252"},{"name":"Nicol\u00e1s Pombo","facebook_id":"10204490688740231","score":"2251"},{"name":null,"facebook_id":null,"score":"2245"},{"name":null,"facebook_id":null,"score":"2244"},{"name":null,"facebook_id":null,"score":"2233"},{"name":null,"facebook_id":null,"score":"2218"},{"name":null,"facebook_id":null,"score":"2213"},{"name":null,"facebook_id":null,"score":"2209"}]}')
      


      function scores( data , url ) {
            if(data.error){
              $('#leaderboard .content .'+url+' span').html("Error fetching data");
              return false;
            }
            var podium = "<div class='podium'>";

            var leaders = "<ol>";

            $.each(data.top_scores, function(index, val) {
              var pic = "";
              if (val.facebook_id != null){
                pic = "<span class='fb_pic' data-id='"+val.facebook_id+"'></span>";
              }else{
                pic = "<img src='images/meta/apple-touch-icon-60x60.png' width='30' height='30' />"
              }
              var name = (val.name != null) ? val.name : "Unknown" ;

              if(index >= 3){
                leaders += "<li class='hide'><span class='name'>"+pic+name+"</span> <span class='right'>"+val.score+"</span></li>";
              }else{
                podium += pic;
                leaders += "<li><span class='name'>"+pic+name+"</span> <span class='right'>"+val.score+"</span></li>";
              }
              if(index == 9){
                return false;
              }
            });
            podium += "</div>"

            leaders += "</ol>";
            leaders += '<a href="#" data-ref="'+url+'" class="show_more">VIEW MORE</a><a href="#" class="go_back" >GO BACK</a>';

            leaders = podium+leaders;
            $l = $(leaders);

            $l.find('.fb_pic').each(function(i,v){
              var $t = $(this);
              /* make the API call */
                FB.api(
                    "/"+$t.data('id')+"/picture",
                    {
                        "redirect": false,
                        "height": "60",
                        "type": "normal",
                        "width": "60"
                    },
                    function (response) {
                      if (response && !response.error) {
                        $t.replaceWith("<img src='"+response.data.url+"' width='30' height='30' />");
                      }else{
                      }
                    }
                );
            })

            

            $('#leaderboard .content .'+url+' span').replaceWith($l);

          }
          w = window.location.href;
          leaders = (w.indexOf('?leaders') > 0) ? true : false;

      if(leaders){
          $('.leaders').not('.big').show();
          $('#leaderboard .coming_soon').hide();

          if(typeof freezerville !== "undefined"){
            scores(freezerville, "freezerville");
          }else{
            scores({"error":true},"freezerville");
          }
        
          if(typeof drowntown !== "undefined"){
            scores(drowntown, "drowntown");
          }else{
            scores({"error":true},"drowntown");
          }
        
          if(typeof dumbest !== "undefined"){
            scores(dumbest, "dumbest");
          }else{
            scores({"error":true},"dumbest");
          }
        
          if(typeof dumbdome !== "undefined"){
            scores(dumbdome, "dumbdome");
          }else{
            scores({"error":true},"dumbdome");
          }
        
          // if(typeof adrenaland !== "undefined"){
          //   scores(adrenaland, "adrenaland");
          // }else{
          //   scores({"error":true},"adrenaland");
          // }

      }
      $(document).on('click','#leaderboard a.show_more',function(event) {
            event.preventDefault()
            $('.leaders').not('.big').fadeOut('fast');
            $('.leaders.big').html($('.'+$(this).data('ref')).html()).slideDown('slow', function() {
            });
            $('.podium ol li').addClass('animated bounceInLeft');
            $('.podium img').addClass('animated bounceInDown');
        });
      $(document).on('click','#leaderboard a.go_back',function(event) {
            event.preventDefault()
            
            $('.leaders.big').slideUp('slow', function() {
            $('.leaders').not('.big').fadeIn('fast'); 
            });;
        });
      // scores("drowntown");
      // scores("dumbest");
      // scores("dumbdome");
      // scores("adrenaland");



  });
});
