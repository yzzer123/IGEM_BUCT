var scroll_db_click = 0;
var pop_index = 1;
var prev_menuSeq;
var video_id;

 


$( function () {

    var s1 = Snap('#animated');
    var progress1 = s1.select('#progress1');
    if(sessionStorage.getItem('language_check')!=1){
    	sessionStorage.clear();
    	LangBarStart();
    	sessionStorage.setItem('language_check', 1);
    }

    function imagesProgress () {
    	
        var $container      =   $( '#progress' ),                     // 1
            $progressBar    =   $('.progress_wrap .progress-bar' ),   // 2
            $progressText   =   $('.progress_wrap .progress-txt' ),   // 3

            imgLoad     =   imagesLoaded( 'body'),
            imgTotal    =   imgLoad.images.length,

            imgLoaded   =   0,
            current     =   0,

            progressTimer   =   setInterval( updateProgress, 1000/60 );

            imgLoad.on( 'progress', function () {
            imgLoaded++;
        } );

        function updateProgress () {

            var target = ( imgLoaded / imgTotal ) * 100;

            current = current + ( target - current ) * 0.1

            $progressBar.css( { width: current + '%' } );

            $progressText.text( Math.floor(current) + '%' );

            if ( current >= 100 ) {

                clearInterval( progressTimer );

                $container.addClass( 'progress-complete' );

                $progressBar.add( $progressText )

                    .delay( 500 )

                    .animate( { opacity: 0 }, 250, function () {

                    $('.progress_wrap').stop().animate( { top: '-100%' }, 1000, 'easeInOutQuint');

                        $('#main-home').stop().delay(500).animate({left:0},800,'easeOutExpo');
                        $('.l-header').stop().delay(500).animate({left:'0'},1000,'easeOutExpo' ,function(){
                            $('#main-home .main-notice').stop().animate({right:'100px'},1500,'easeOutExpo' );
                            $('.c-btn__rnb,.main-scroll-arrow').stop().fadeIn(2000);
                            $('.main-bnr1').stop().animate({left:'136px'},1800,'easeOutExpo' );
                            $('.main-bnr2').stop().animate({left:'136px'},2000,'easeOutExpo' );                            
                        });
                } );
                $('.l-lang').animate({bottom:'-163px'},1000,'easeOutExpo');
            }

            if ( current > 99.9 ) {
                current = 100;
            }
        }

    }
    
    
    function lnb_close(opt1){
        s1 = Snap('#animated');
        progress1 = s1.select('#progress1');

        $('.c-button--s1').find('.c-button--s1__icon-bar').eq(2).css('overflow','hidden');
        progress1.attr({strokeDasharray: '0, 251.2',stroke:'#ff3f34'});
        Snap.animate(0,251.2, function( value ) {
            progress1.attr({ 'stroke-dasharray':value+',251.2'});
        }, 1000,mina.bounce);
        $('.l-lnb').stop().animate({left:-615+'px'},400,'easeInExpo',function(){
            $('.c-button--s1').removeClass('c-button--s1-open').addClass('c-button--s1-close');
            $('.c-button--s1').removeClass('c-button--s1-open');
            if(opt1 != 1){
                $('.l-background').stop().animate({opacity:0},1000,'easeOutExpo').hide(0);
            }
            $('.l-header').removeClass('l-header--fix');
            $('.c-button--s1__circle-top').css({visibility:'hidden'});
        });
        $('.l-header__logo-a').css({width:148+'px',display:'none'});

        if($('.l-header__logo-b').hasClass('l-header__logo--sub')){
            $('.l-header__logo-b').stop().animate({width:103+'px'},500,'easeOutBounce');
        } else {
            $('.l-header__logo-b').stop().animate({width:148+'px'},500,'easeOutBounce');
        }
        $('.c-button--s1').find('.c-button--s1__icon-bar').eq(0).find('div').stop().attr('style','');
        $('.c-button--s1').find('.c-button--s1__icon-bar').eq(2).find('div').stop().attr('style','');


    }

    function btn_circle_ani(cl,cl_n,opt1,opt2,opt3,opt4,c1,c2,c3,sd1,sd2,color){
        var sn  = $(cl).find('svg').addClass(cl_n);
        var s2 = Snap('.'+cl_n);
        $(cl).find('>div svg circle').remove();
        //console.log("cl :: " + cl);
        var progress2 = s2.circle(c1, c2, c3).attr({
            fill: "none",
            stroke: color,
            strokeWidth: 2,
            strokeDasharray: sd1+" "+sd2,
            strokeDashoffset: 1110,
            outline:0
        });

        Snap.animate(opt1,opt2, function( value ){
               progress2.attr({ 'strokeDashoffset': value })
        },opt4,mina.bounce );
        if(opt3 == 'in'){
            $(cl+' >div').fadeIn(300);
        } else {
            $(cl+' >div').fadeOut(500);
        }

    }

    function s_popup_open(cl){
        var c_cl = cl;
        $('.l-container__pop').show();
        lnb_close();

        $(c_cl + ' .s-popup__section2').stop().delay(500).animate({width:100+ '%'},700,'easeOutExpo',function(){
            $(c_cl + ' .s-popup__section1').stop().animate({left:0},500,'easeOutExpo');
            $(c_cl + ' .s-popup__section2').stop().animate({width:50 + '%'},1000,'easeOutExpo');
            $(c_cl + ' .s-popup__area1').stop().delay(500).animate({left:0,opacity:1},1200,'easeOutExpo');
            $(c_cl + ' .s-popup__area2').stop().delay(500).animate({left:0,opacity:1},1400,'easeOutExpo');
            $(c_cl + ' .s-popup__area3').stop().delay(500).animate({left:0,opacity:1},1600,'easeOutExpo');
            $(c_cl + ' .s-popup__area4').stop().delay(500).animate({left:0,opacity:1},1800,'easeOutExpo');

            $(c_cl + ' .s-popup__head').stop().delay(500).animate({left:0,opacity:1},1500,'easeOutExpo');
            $(c_cl + ' .s-popup__r-area1').stop().delay(500).animate({left:0,opacity:1},1200,'easeOutExpo');
            $(c_cl + ' .s-popup__r-area2').stop().delay(500).animate({left:0,opacity:1},1400,'easeOutExpo');
            $(c_cl + ' .s-popup__r-area3').stop().delay(500).animate({left:0,opacity:1},1800,'easeOutExpo');
            $(c_cl + ' .s-popup__r-area4').stop().delay(500).animate({left:0,opacity:1},2000,'easeOutExpo');
            $(c_cl + ' .s-popup__r-area5').stop().delay(500).animate({left:0,opacity:1},2200,'easeOutExpo');
            
            $(c_cl + ' .s-contents__box').stop().delay(500).animate({left:0,opacity:1},1200,'easeOutExpo');
            
            if(c_cl == '.s-contact'){            	
                
                $('#map').css('width','100%');                
            }
            
        });

    }

    function s_popup_close(cl){
    	$('body').css("overflow",""); //스크롤방지해제
    	$('body').css('height',"");
        var c_cl = cl;
        if(c_cl == '.s-contact'){            	
            
        	var contact_map_w  = $('.l-container__pop').width() / 2 * 0.73;
        	$('#map').width(contact_map_w);                
        }
        $(c_cl + ' .s-popup__section1').stop().delay(300).animate({left:-50 + '%'},500,'easeOutExpo');
        $(c_cl + ' .s-popup__section2').stop().delay(300).animate({width:100 + '%'},500,'easeOutExpo',function(){
            $(c_cl + ' .s-popup__section2').stop().animate({width:0 + '%'},500,'easeOutExpo',function(){
                if(!$('.s-popup').hasClass('on')){
                    $('.l-container__pop').hide();
                }
                $(c_cl).css('zIndex','1');
            });

        });
        $(c_cl + ' .s-popup__area1').stop().animate({left:-530+'px',opacity:0},1000,'easeOutExpo');
        $(c_cl + ' .s-popup__area2').stop().animate({left:-530+'px',opacity:0},1400,'easeOutExpo');
        $(c_cl + ' .s-popup__area3').stop().animate({left:-530+'px',opacity:0},1800,'easeOutExpo');
        $(c_cl + ' .s-popup__area4').stop().animate({left:-530+'px',opacity:0},2200,'easeOutExpo');

        $(c_cl + ' .s-popup__head').stop().delay(300).animate({left:530+'px',opacity:0},3000,'easeOutExpo');
        $(c_cl + ' .s-popup__r-area1').stop().delay(300).animate({left:530+'px',opacity:0},3000,'easeOutExpo');
        $(c_cl + ' .s-popup__r-area2').stop().delay(300).animate({left:530+'px',opacity:0},3200,'easeOutExpo');
        $(c_cl + ' .s-popup__r-area3').stop().delay(300).animate({left:530+'px',opacity:0},3400,'easeOutExpo');
        $(c_cl + ' .s-popup__r-area4').stop().delay(300).animate({left:530+'px',opacity:0},3000,'easeOutExpo');
        $(c_cl + ' .s-popup__r-area5').stop().delay(300).animate({left:530+'px',opacity:0},3000,'easeOutExpo');
        
        $(c_cl + ' .s-contents__box').stop().delay(500).animate({left:530+'px',opacity:0},1200,'easeOutExpo');

    }

    $('.c-button--s1').mouseenter(function(){
        if($(this).hasClass('c-button--s1-open')){
            $(this).find('.c-button--s1__icon-bar').eq(1).find('>div').addClass('on');
            $(this).find('.c-button--s1__icon-bar').eq(2).find('>div').addClass('on');
            $(this).find('.c-button--s1__icon-bar').eq(2).css('overflow','visible');
        }
    }).mouseleave(function(){
        if($(this).hasClass('c-button--s1-open')){
            $(this).find('.c-button--s1__icon-bar').eq(1).find('>div').removeClass('on');
            $(this).find('.c-button--s1__icon-bar').eq(2).find('>div').removeClass('on');
            $(this).find('.c-button--s1__icon-bar').eq(2).css('overflow','hidden');
        }

    });
    
    $('.main-home__video-slide').mouseenter(function(e){
    	
		//$(".bxslider-s2__wrap .bx-wrapper .bx-controls").css("display","flex");
		$(".bxslider-s2__wrap .bx-wrapper .bx-controls").fadeIn(1000,function() {
			
		});
    	
    		
    }).mouseleave(function(e){
    	//$(".bxslider-s2__wrap .bx-wrapper .bx-controls").css("display","none");
    	$(".bxslider-s2__wrap .bx-wrapper .bx-controls").fadeOut(1000);
    });

    $('.c-button--s1').click(function(){
        s1 = Snap('#animated');
        progress1 = s1.select('#progress1');

        if($(this).hasClass('c-button--s1-close')){
            $('.c-button--s1__circle-top').css({visibility:'visible'});
            $(this).removeClass('c-button--s1-close');
            $(this).find('.c-button--s1__icon-bar').eq(1).stop().animate({width:31+'px',left : -9+'px'},300);
            $('.l-header__logo-a').stop().animate({width:103+'px'},500,'easeOutBounce');
            if($('.l-header__logo-b').hasClass('l-header__logo--sub')){
                $('.l-header__logo-b').css({width:148+'px',display:'none'});
            } else {
                $('.l-header__logo-b').css({width:103+'px',display:'none'});
            }
            $(this).find('.c-button--s1__icon-bar').eq(1).find('div').stop().animate({left:0},300,function(){
                $('.c-button--s1__icon-bar').eq(1).stop().animate({width:100+'%',left : 0},300,function(){
                    $('.c-button--s1').addClass('c-button--s1-open');
                });
            });
            progress1.attr({strokeDasharray: '0, 251.2',stroke:'#bcbcbc'});
            Snap.animate(0,251.2, function( value ) {
                progress1.attr({ 'stroke-dasharray':value+',251.2'});
            }, 1000,mina.bounce);
            $(this).find('.c-button--s1__icon-bar').eq(0).find('div').stop().animate({left:100+'%'},100);
            $(this).find('.c-button--s1__icon-bar').eq(2).find('div').stop().animate({left:-100+'%'},100);
            $('.l-background').stop().show(0).animate({opacity:0.5},1000,'easeOutExpo');
            $('.l-lnb').stop().animate({left:0},1000,'easeOutExpo');
            $('.l-header').addClass('l-header--fix');
        } else {
            lnb_close();
        }


    });

    $('.c-btn__rnb').click(function(){
        $('.l-background').stop().show(0).animate({opacity:0.5},1000,'easeOutExpo');
        $('.l-rnb').stop().animate({right:0},1000,'easeOutExpo');
    });

    $('.l-rnb').mouseleave(function(){
        $('.l-rnb').stop().animate({right:-320+'px'},400,'easeOutExpo',function(){
            $('.l-background').stop().animate({opacity:0},1000,'easeOutExpo').hide(0);
        });
    });

    $('.l-background').mouseenter(function(){
    	if($('.s-media__rnb').hasClass("on") != true){
    		lnb_close();
    		$('.l-rnb').stop().animate({right:-320+'px'},400,'easeOutExpo',function(){
    			$('.l-background').stop().animate({opacity:0},1000,'easeOutExpo').hide(0);
    	    });
    	}
        /*if($('.c-button--s1').hasClass('c-button--s1-open')){
        	
            lnb_close();
        }*/
    });

    $('.c-button--s4').mouseenter(function(){
        var cur_idx = $(this).attr('data-val');
        //console.log("cur_idx: "+cur_idx);
        
        $(this).addClass('c-button--s4-'+cur_idx);
        var cur_cl = ".c-button--s4-"+cur_idx;
        var cur_val = "c-svg--s4-"+cur_idx;
        btn_circle_ani( cur_cl,cur_val,0,220,'in',1000,35, 35, 33,115,25,'#fc4e45');

    }).mouseleave(function(){
        var cur_idx = $(this).attr('data-val');
        //console.log("cur_idx2: "+cur_idx);
        //console.log("lang_val_chk: "+lang_val_chk);
        
        if(lang_val_chk != cur_idx){
        	$(this).addClass('c-button--s4-'+cur_idx);
            var cur_cl = ".c-button--s4-"+cur_idx;
            var cur_val = "c-svg--s4-"+cur_idx;
            btn_circle_ani( cur_cl,cur_val,220,0,'out',800,35, 35, 33,115,25,'#fc4e45');	
        }
        
        
    });

    $('.s-list__s1').mouseenter(function(){
        var cur_idx = $(this).find('.c-button--s5').attr('data-val');
        $(this).find('.c-button--s5').addClass('c-button--s5-'+cur_idx);
        var cur_cl = ".c-button--s5-"+cur_idx;
        var cur_val = "c-svg--s5-"+cur_idx;
        btn_circle_ani( cur_cl,cur_val,0,220,'in',1000,32, 32, 30,120,17,'#fdcbc9');
    }).mouseleave(function(){
        var cur_idx =$(this).find('.c-button--s5').attr('data-val');
        $(this).find('.c-button--s5').addClass('c-button--s5-'+cur_idx);
        var cur_cl = ".c-button--s5-"+cur_idx;
        var cur_val = "c-svg--s5-"+cur_idx;
        btn_circle_ani( cur_cl,cur_val,220,0,'out',800,32, 32, 30,120,17,'#fdcbc9');
    });

    $('.l-lang__open').click(function(){
        lnb_close(1);
        $('.l-lang').animate({bottom:0},1000,'easeOutExpo');
    });

    $('.l-lang').mouseleave(function(){
        $('.l-lang').animate({bottom:-163 + 'px'},1000,'easeOutExpo');
        $('.l-background').stop().animate({opacity:0},1000,'easeOutExpo').hide(0);
    });

    $('.c-tab__s1 >a').click(function(){
        if(!$(this).hasClass('on')){
            var cur_idx = $(this).index();
            $('.c-tab__s1 >a').removeClass('on');
            $('[id^="l-tab__cont"]').removeClass('on');
            $(this).addClass('on');
            $('[id^="l-tab__cont"]').eq(cur_idx).addClass('on');
        }
    });

    $('.s-media-menu').click(function(){
    	$('.s-media__rnb').addClass("on");
        $('.s-media__rnb').animate({right:0},1000,'easeOutExpo');
        $('.l-background').stop().show(0).animate({opacity:0.5},1000,'easeOutExpo');
        $("#FS-1").addClass("c-btn__rnb--black");
    });
    $('.s-media__rnb').mouseleave(function(){
    	$('.s-media__rnb').removeClass("on");
        $('.s-media__rnb').animate({right:-485 + 'px'},1000,'easeOutExpo');
        $('.l-background').stop().animate({opacity:0},1000,'easeOutExpo').hide(0);
        $("#FS-1").removeClass("c-btn__rnb--black");
    });

    $('.c-button--s6').mouseenter(function(){
        $(this).find('.c-button--s6__icon-bar').eq(1).find('>div').addClass('on');
        $(this).find('.c-button--s6__icon-bar').eq(2).find('>div').addClass('on');
    }).mouseleave(function(){
        $(this).find('.c-button--s6__icon-bar').eq(1).find('>div').removeClass('on');
        $(this).find('.c-button--s6__icon-bar').eq(2).find('>div').removeClass('on');
    });

    $('.l-contact__open').click(function(){
    	
    	if($('.s-contents').hasClass('on') == true){
    		$('.s-contents .c-button--s6').trigger('click');
    	}
    	
    	if($('.s-privacy').hasClass('on')){
    		$('.s-privacy .c-button--s6').trigger('click');
    	}
    	$('body').css("overflow","hidden"); //스크롤방지
    	$('body').css('height',"100%");
    	$('.scroll-bar').css("display","none");
        pop_index = pop_index + 1;
        
        if(!$('.s-contact').hasClass('on')){
            $('.s-contact').addClass('on').css('zIndex',pop_index);
            $("#FS-1").addClass("c-btn__rnb--black");
            s_popup_open('.s-contact');
            if($("#progress").hasClass("l-container-sub") == true){
            	$('.l-container').removeClass('l-container-sub');	
            }
            
            google.maps.event.trigger(map, "resize"); // 팝업오픈시 구글맵 resize 해야 회색 화면이 안뜸
            map.setCenter(new google.maps.LatLng(37.553388,126.955757)); // resize 한후 center 가 맞지않아서 다시 설정해줌
        } else {
            alert("현재 팝업 페이지를 닫아 주세요.");
        }
    });
    $('.l-privacy__open_lnb').click(function(){
    	
    	if($('.s-contents').hasClass('on')){
    		$('.s-contents .c-button--s6').trigger('click');
    	}
    	
    	if($('.s-contact').hasClass('on')){
    		$('.s-contact .c-button--s6').trigger('click');
    	}
    	$('body').css("overflow","hidden"); //스크롤방지
    	$('body').css('height',"100%");
        pop_index = pop_index + 1;
        if(!$('.s-privacy').hasClass('on')){
        	$('.scroll-bar').css("display","");
            $('.s-privacy').addClass('on').css('zIndex',pop_index);
            $("#FS-1").addClass("c-btn__rnb--black");
            $('.l-container').removeClass('l-container-sub');
            s_popup_open('.s-privacy');
        } else {
            alert("현재 팝업 페이지를 닫아 주세요.");
        }
    });
    $('.l-privacy__open').click(function(){
    	$('body').css("overflow","hidden"); //스크롤방지
    	$('body').css('height',"100%");
        pop_index = pop_index + 1;
        if(!$('.s-privacy').hasClass('on')){
        	$('.scroll-bar').css("display","");
            $('.s-privacy').addClass('on').css('zIndex',pop_index);
            $("#FS-1").addClass("c-btn__rnb--black");
            $('.l-container').removeClass('l-container-sub');
            s_popup_open('.s-privacy');
        } else {
            alert("현재 팝업 페이지를 닫아 주세요.");
        }
    });
    $('.contents-pop__open').click(function(){
    	$('body').css("overflow","hidden"); //스크롤방지
    	$('body').css('height',"100%");
    	var contents_menu_seq = $(this).attr("data-menu-seq");
    	if($('.s-contact').hasClass('on')){
    		$('.scroll-bar').css("display","none");
    		$('.s-contact .c-button--s6').trigger('click');
    	}else if($('.s-privacy').hasClass('on')){
    		$('.s-privacy .c-button--s6').trigger('click');
		}else{
			$('.scroll-bar').css("display","none");
		}
    	if(pop_index > 1){
    		$('.s-contents .c-button--s6').trigger('click');
    		setTimeout(function() {
    			var resultData = openContentsPopup(contents_menu_seq);
    			//console.log("resultData: "+resultData);
    	    	if(resultData){
    	    		pop_index = pop_index + 1;
    	            $('.s-contents').addClass('on').css('zIndex',pop_index);
    	            s_popup_open('.s-contents');	
    	    	}
    		}, 1300);
		}else{
			var resultData = openContentsPopup(contents_menu_seq);
			//console.log("resultData2: "+resultData);
	    	if(resultData){
	    		pop_index = pop_index + 1;
	            $('.s-contents').addClass('on').css('zIndex',pop_index);
	            s_popup_open('.s-contents');	
	    	}
		}
    });
    $('.s-contact .c-button--s6').click(function(){
        pop_index = pop_index - 1;
        $('.s-contact').removeClass('on');
        var link = document.location.href;
        
        if($('.s-contents').hasClass('on') == true){
        	
        }else{
        	if(link.indexOf("/main") != -1 || link.indexOf("/mediaCenter/index") != -1){
        		$("#FS-1").removeClass("c-btn__rnb--black");
        	}else if(link.indexOf("/about/index") != -1){
        		$("#FS-1").addClass("c-btn__rnb--black");
        		if($("#progress").hasClass("l-container-sub") == false){
        			$('.l-container').addClass('l-container-sub');
        		}
            	if(pop_index == 1){
            		$('.s-scroll-nav').show();
            	}else{
            		$('.s-scroll-nav').hide();
            	}
        	}else{
        		if($(".s-works__g-in").css("display") == "block"){
        			$("#FS-1").removeClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","none");
        		}else{
        			$("#FS-1").addClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","block");	
        		}
        	}
        }
        s_popup_close('.s-contact');
        $('.s-contact__popup').fadeOut(300);
    });
    $('.s-privacy .c-button--s6').click(function(){
    	$('.scroll-bar').css("display","none");
        pop_index = pop_index - 1;
        $('.s-privacy').removeClass('on');
        $('.l-container').addClass('l-container-sub');
        var link = document.location.href;
        
        if($('.s-contact').hasClass('on') == true || $('.s-contents').hasClass('on') == true){
        	if(link.indexOf("/main") != -1 || link.indexOf("/mediaCenter/index") != -1){
        		
        	}else{
        		$('.l-container').removeClass('l-container-sub');
        	}
        }else{
        	if(link.indexOf("/main") != -1 || link.indexOf("/mediaCenter/index") != -1){
        		$("#FS-1").removeClass("c-btn__rnb--black");	
        	}else{
        		if($(".s-works__g-in").css("display") == "block"){
        			$("#FS-1").removeClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","none");
        		}else{
        			$("#FS-1").addClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","block");	
        		}
        		if(link.indexOf("/about/index") != -1){
                	//$("#FS-1").addClass("c-btn__rnb--black");
                	if(pop_index == 1){
                		$('.s-scroll-nav').show();
                	}else{
                		$('.s-scroll-nav').hide();
                	}
                }
        	}
        }
        s_popup_close('.s-privacy');
    });
    $('.s-contents .c-button--s6').click(function(){
        pop_index = pop_index - 1;
        $('.s-contents').removeClass('on');
        $('.l-lnb__menu').find('a').removeClass("on");
        $('#'+sessionStorage.getItem('prevMenuSeq')).addClass('on');
        s_popup_close('.s-contents');
        
        var link = document.location.href;
        
        if($('.s-contact').hasClass('on') == true || $('.s-privacy').hasClass('on') == true){
        	$('.l-container').removeClass('l-container-sub');
        }else{
        	if(link.indexOf("/main") != -1 || link.indexOf("/mediaCenter/index") != -1){
        		$("#FS-1").removeClass("c-btn__rnb--black");
        	}else{
        		$('.l-container').addClass('l-container-sub');
        		if($(".s-works__g-in").css("display") == "block"){
        			$("#FS-1").removeClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","none");
        		}else{
        			$("#FS-1").addClass("c-btn__rnb--black");
            		$(".c-btn__top").css("display","block");	
        		}
        		if(link.indexOf("/about/index") != -1){
                	//$("#FS-1").addClass("c-btn__rnb--black");
                	if(pop_index == 1){
                		$('.s-scroll-nav').show();
                	}else{
                		$('.s-scroll-nav').hide();
                	}
                	
                }
        	}
        }
       
    });
    $('.s-contact-text__input').focus(function(){
        $(this).next().stop().fadeIn(300);
    }).blur(function(){
        var c_txt = $(this).text().length;
        //console.log(c_txt);
        if(c_txt > 0) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
        $(this).next().stop().fadeOut(300);
    });
    $('.s-contact-text__input-box >a').click(function(){
        $(this).prev().html("");
    });
    $('.s-contact__popup .s-contatct__close').click(function(){ 
        $('.s-contact__popup').fadeOut(300);
    });
 /*   $('.s-contact__submit-button').click(function(){ //contact.jsp 에서 쓸예정
        $('.s-contact__popup').fadeIn(300);
    });*/

    jQuery('.scrollbar-outer').scrollbar();

//    $('.s-about__item >li').mouseenter(function(){
//        $(this).addClass('on');
//        $(this).siblings().removeClass('on');
//    }).mouseleave(function(){
//        $(this).removeClass('on');
//    });

    $('.s-about__wrap .s-scroll-nav__item').click(function(){
        if(!$(this).hasClass('on')){
            var c_top1 = $('.s-about__wrap').offset().top;
            var c_top2 = $('.s-about__section').offset().top;

            $('.s-about__wrap').addClass('on');
            if($(this).index() == 0){
                $("html, body").stop().animate({scrollTop:c_top1}, 700, 'easeInOutExpo',function(){
                    $('.s-about__wrap').removeClass('on');
                });
            } else {
                $("html, body").stop().animate({scrollTop:c_top2}, 700, 'easeInOutExpo',function(){
                    $('.s-about__wrap').removeClass('on');
                });
            }

            $('.s-scroll-nav__item').removeClass('on');
            $(this).addClass('on');

        }
    });

    $('#c-btn__top').click(function(){
    		var link = document.location.href;
        	if(link.indexOf("/main") != -1){
        		$('#home').trigger('click');
        	}else{
        		$("html, body").stop().animate({scrollTop:0}, 700, 'easeInOutExpo');
        	}
    });

    var s_works_g_item = $('.s-works__g-box >ul >li');
    var s_works_g = $('.s-works__g-box >ul >li').size();
    if(s_works_g > 0){
        if(s_works_g_item.eq(0).hasClass('on')){
            $('.s-works__g-btn--prev').hide();
        } else if(s_works_g_item.last().hasClass('on')){
            $('.s-works__g-btn--next').hide();
        }

/*        $('.s-works__g-btn').click(function(){
            var mv_size,mv_way;
            var c_idx = $('.s-works__g-box >ul >li.on').index();
            var last_idx = $('.s-works__g-box >ul >li:last').index();
            var item_w = $('.s-works__g-box > ul > li').width();
            //console.log("last_idx :: " + last_idx);
            //console.log("c_idx :: " + c_idx);

            $('.s-works__g-btn').stop().fadeOut(300);
            $('.s-works__g-box >ul >li').removeClass('on');

            if($(this).hasClass('s-works__g-btn--next')){
                mv_way = c_idx+1;
            } else {
                mv_way = c_idx-1;
            }

            $('.s-works__g-box >ul >li').eq(mv_way).addClass('on');
            mv_size = item_w * (mv_way);

            $('.s-works__g-box').stop().animate({left: "-" + mv_size + 'px'}, 700, 'easeInOutExpo',function(){

                if(mv_way > 0){
                    $('.s-works__g-btn--prev').stop().fadeIn(300);
                }
                if(mv_way != last_idx){
                    $('.s-works__g-btn--next').stop().fadeIn(300);
                }

            });


        });*/
    }

/*    $('.s-works__list-item .c-button--s5').click(function(){
        $('.s-works__gallery').stop().animate({width: 100 + '%'}, 700, 'easeInOutExpo',function(){
            $('.l-container').removeClass('l-container-sub');

        });
        $('.s-works__gallery .s-works__g-in').fadeIn(1500);
        $('.l-header').addClass('l-headder--s-works__g');
        $('.s-works__g-btn--prev').hide();
        $('.s-works__g-btn--next').fadeIn(700);

    });*/

    $('.s-works__g-close').click(function(){
        $('.s-works__gallery').stop().animate({width: 0 }, 700, 'easeInOutExpo',function(){
            $('.s-works__g-box').css('left','0');
            $('.s-works__g-box > ul > li').removeClass('on');
            $('.s-works__g-box > ul > li').eq(0).addClass('on');
        });
        $('.s-works__gallery .s-works__g-in').fadeOut(500);
        $('.l-container').addClass('l-container-sub');
        $('.l-header').removeClass('l-headder--s-works__g');
        $(".c-btn__top").css("display","block");
        $("#FS-1").addClass("c-btn__rnb--black");
    });

    $('.s-scroll-nav--main .s-scroll-nav__item').click(function(){
    	var c_idx =  $('.s-scroll-nav--main .s-scroll-nav__item.on').index();
    		
        if(!$(this).hasClass('on') && scroll_db_click == 0){
            scroll_db_click = 1;
            main_item_hide();
            if($(this).index() == 0){
            	if(playerList[video_id] != null){
        			//console.log("play: ");
  				   playerList[video_id].play();
  			   }
                $('.s-scroll-nav--main').removeClass('mcs-business');
                $(".l-header").removeClass("main_cont_view3");
                $('#main-home').css('zIndex','3');
                $('#main-contents').css('zIndex','1');
                $('#main-business').css('zIndex','1');
                $('#main-home .main-contents__view,#main-home .bxslider-s2__wrap').css('visibility','visible');
                $('#main-home').stop().animate({top:0},700, 'easeInOutExpo',function(){
                    $('#main-contents').css('bottom','-100%');
                    $('#main-business').css('height',0);
                    main_item_show(1);
                    main_cont_end();
                    scroll_db_click=0;
                });
                $("#FS-1").removeClass("c-btn__rnb--black");
                $('#c-btn__top').stop().fadeOut();
            } else if($(this).index() == 1){
            	
            	if(playerList[video_id] != null){
        			//console.log("pause: ");
  				   playerList[video_id].pause();
  			    }
                $('.s-scroll-nav--main').removeClass('mcs-business');
                $(".l-header").removeClass("main_cont_view3");
                $('#main-home').css('zIndex','1');
                $('#main-contents').css('zIndex','3');
                $('#main-business').css('zIndex','1');
                $('#main-home .main-contents__view,#main-home .bxslider-s2__wrap').css('visibility','hidden');                                              
                $('#main-contents').stop().animate({bottom:0},700, 'easeInOutExpo',function(){
                    $('#main-home').css('top','-100%');
                    $('#main-business').css('height',0);
                    $('.main-cont__start-box').css('display','flex');
                    main_cont_start();
                    scroll_db_click=0;
                });
                $("#FS-1").removeClass("c-btn__rnb--black");
                $('#c-btn__top').stop().fadeIn(2000);
            } else if($(this).index() == 2){
                $('.s-scroll-nav--main').addClass('mcs-business');
                $(".l-header").addClass("main_cont_view3");
                $('#main-home').css('zIndex','1');
                $('#main-contents').css('zIndex','1');
                $('#main-business').css('zIndex','3');
                $('#main-home .main-contents__view,#main-home .bxslider-s2__wrap').css('visibility','hidden');
                $('#main-business').stop().animate({height:100+"%"},700, 'easeInOutExpo',function(){
                	$('#main-home').css('top','-100%');
                	$('#main-contents').css('bottom','100%');
                    main_item_show();
                    main_cont_end();
                    scroll_db_click=0;
                });
                $("#FS-1").addClass("c-btn__rnb--black");
                
            }

            $('.s-scroll-nav__item').removeClass('on');
            $(this).addClass('on');

        }
    });
    $('.l-lnb:not(:animated)').mouseleave(function(){
    	if($('.c-button--s1').hasClass('c-button--s1-open')){
            //lnb_close();
        }
    });


    $('.main-business__conts-more').mouseenter(function(){
        $(this).parents('li').addClass('on');
        $(this).parents('li').siblings().removeClass('on');
    })
    $('.main-business__conts-item li').mouseleave(function(){
        $('.main-business__conts-item li').removeClass('on');
    });
  
    
    $(".main-contents").on('mousewheel DOMMouseScroll', function(e) {        
        var E = e.originalEvent;      
        var delta = 0;
        if(E.detail) {          
            delta = E.detail * -40;
            //if(delta < 0) $('#contents').trigger('click');
        }else{           
        	delta = E.wheelDelta;
        	//if(delta < 0) $('#contents').trigger('click');
        }
        if(delta < 0){
        	if($("#home").hasClass("on") == true){
        		$('#contents').trigger('click');	
        	}
        	if($("#contents").hasClass("on") == true){
        		$('#business').trigger('click');	
        	}
        }else{
        	if($("#business").hasClass("on") == true){
        		$('#contents').trigger('click');
        	}
        	if($("#contents").hasClass("on") == true){
        		$('#home').trigger('click');
        	}
        }
    });
    
    
    
    /*$('.bx-controls bx-has-controls-direction bx-has-pager').mouseenter(function(){
        
        console.log("bx-controls in ");
        
        

    }).mouseleave(function(){
        
    	console.log("bx-controls out ");
        
        
        
        
    });*/
    
    
    
    //브라우저 버전체크
    var IEVersionCheck = function(){
    	var word;
    	var version = "N/A";
    	
    	var agent = navigator.userAgent.toLowerCase();
    	var name = navigator.appName;
    	
    	// IE old version (IE 10 or Lower)
    	if(name=="Microsoft Internet Explorer"){
    		word="msie ";
    	}else{
    		// IE 11
    		if(agent.search("trident")>-1){
    			word="trident/.*rv";
    		}else if(agent.search("edge/")>-1){
    			word="edge/";
    		}
    	}
    	
    	var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
    	
    	if(reg.exec(agent)!=null){
    		version = RegExp.$1 + RegExp.$2;
    	}
    	// return version;
    	
    	//console.log("version is "+version);
    	
    	if(version<=10){
    		location.href="/etc/browserupgrade"
    	}
    };
    
    IEVersionCheck();
    
    imagesProgress();
    
    $(window).scroll(function(){
        if($(document).scrollTop() > 500){
        	$('.c-btn__top').stop().fadeIn();
        }else if($(document).scrollTop() == 0){
        	$('.c-btn__top').stop().fadeOut();
        }
    });
    
} );
//document ready end


function LangBarStart(){	
	$('.l-lang').animate({bottom:0},1000,'easeOutExpo',function(){
		$('.l-lang').delay('2000').animate({bottom:'-163px'},1000,'easeOutExpo');
	});
	
}

function chkRequired(form){

    var DEFAULT_MSG = "필수값을 입력하셔야 합니다.";
    var $form = form, result = true;
    var $objectList = $form.find("[meta='req']");

    $.each($objectList, function(index, item){
        var $this = $(this);
        var tagName = $(item).get(0).tagName;

        switch (tagName.toUpperCase()) {
            case "INPUT":
                var type = $this.attr("type").toUpperCase();
                if(type == "CHECKBOX"){
                    var theName = $(this).attr("name");
                    var theValue = $("input:checkbox[name="+theName+"]:checked").size();
                    
                    if(theValue == 0){
                        if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                            alert(DEFAULT_MSG);
                        }else{
                            alert($this.attr("req-msg"));
                        }
                        
                        $this.focus();
                        result = false;
                    }else{
                    	$("#"+$this.attr("req-id")).html("");
                    }
                }else if(type == "RADIO"){
                    var theName = $(this).attr("name");
                    if(form.find(":checked[name="+theName+"]").size() == 0){
                        if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                            alert(DEFAULT_MSG);
                        }else{
                            alert($this.attr("req-msg"));
                        }
                        $this.focus();
                        result = false;
                    }else{
                    	$("#"+$this.attr("req-id")).html("");
                    }
                }else{
                    var valueemail = $this.val();
                    
                    var maillist = new Array();
                    maillist = valueemail.split(",");
                    
                    if(valueemail != undefined && valueemail != ""){
                        if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                            alert(DEFAULT_MSG);
                        }else{
                        	var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                        	if($this.attr("req-email") != undefined && $this.attr("req-email") != "" && $this.attr("req-email") == "check"){
                        		
                        		if(maillist.length > 0){
                        			for (var i=0; i<maillist.length; i++) {
                        				
                        				if(!regExp.test(maillist[i])){
                        					alert('이메일 형태가 맞지 않습니다.');
                                	        $this.focus();
                                	        return false;	
                        				}
                        		    }
                        		}else
                        		if(!regExp.test(valueemail)){
                        			alert('이메일 형태가 맞지 않습니다.');
                        	        $this.focus();
                        	        return false;
                            }else{
                            	$("#"+$this.attr("req-id")).html($this.attr("req-msg"));	
                            }
                            
                        }

                        }


                    }else{
                    	$("#"+$this.attr("req-id")).html("");
                    }
                }
                break;
            case "SELECT":
                var value = $this.find("option:selected").val();
                if(value == undefined || value == ""){
                    if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                        alert(DEFAULT_MSG);
                    }else{
                        //alert($this.attr("req-msg"));
                    	$("#"+$this.attr("req-id")).html($this.attr("req-msg"));
                    }
                    
                    $this.focus();
                    result = false;
                }else{
                	$("#"+$this.attr("req-id")).html("");
                }
                break;
            case "TEXTAREA":
            	var value = $this.val();
                if(value == undefined || value == ""){
                    if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                        alert(DEFAULT_MSG);
                    }else{
                        //alert($this.attr("req-msg"));
                        $("#"+$this.attr("req-id")).html($this.attr("req-msg"));
                    }
                    
                    
                    $this.focus();
                    result = false;
                }else{
                	$("#"+$this.attr("req-id")).html("");
                }
                break;    
            default:
                var value = $this.val();
                if(value == ""){
                    if($this.attr("req-msg") == undefined || $this.attr("req-msg") == ""){
                        alert(DEFAULT_MSG);
                    }else{
                        alert($this.attr("req-msg"));
                    }
                    
                    $this.focus();
                    result = false;
                }
                break;
        }
    });
    return result;
}

function goPage(menuType,menuUrl,menuSeq) {
	////console.log("menuSeq: "+menuSeq);
	
	if(menuType == '1'){
		sessionStorage.setItem('prevMenuSeq', menuSeq);
		if(pop_index > 1){
			main_item_hide();
			$('.c-button--s6__icon-bar').trigger('click');
			$('.c-button--s6__circle-top').trigger('click');	
		}
		setTimeout("location.href='"+menuUrl+"'",300);
	}else if(menuType == '2'){
		////console.log("팝업타입");
		////console.log(menuUrl);
		//$('.l-lnb__menu').children('a').removeClass("on");
		$('.l-lnb__menu').find('a').removeClass("on");
		$("#p-"+menuUrl).addClass("on");
	}
}

function openContentsPopup(contents_menu_seq) {
	var resultData = false;
	$.ajax({   
		type: "POST",
		url : "/getmainContents",
		data : {"contents_menu_seq" : contents_menu_seq},
		async: false,
		cache: false
	}).done(function( data ) {
		////console.log(data.data.contentsInfo);
		var contentInfo = data.data.contentsInfo;
		if(data.result == '101'){
			resultData = true;
			if(contentInfo.contentsUrl != ""){
				$("#content_pop_menu_nm").html(contentInfo.contentsMenuNm+'<a href="' + contentInfo.contentsUrl +'" target="_blank"><img src="/resources/pc/images/s-contents-pop-icon.png" alt="" /></a>');	
			}else{
				$("#content_pop_menu_nm").html(contentInfo.contentsMenuNm);
			}
			$(".s-contents__box").html(contentInfo.contentsContent);
			$("#contentsPopupImg").css({"background":"url(/file/download/"+contentInfo.contentsFileSeq+")", 'background-position':'center top'});
			$("#FS-1").addClass("c-btn__rnb--black");
			if(!$('.s-contact').hasClass('on')){
				$('.l-container').removeClass('l-container-sub');	
			}
			
			$(".c-btn__top").css("display","none");
		}
	});
	return resultData;
}

function main_item_show(n){
    $('.l-header').stop().fadeIn(500);    
    if(!$('#home').hasClass('on')){
    	$('.s-scroll-nav').stop().fadeIn(500);
    }   
    $('.c-btn__top').stop().fadeIn(500);
    $('.c-btn__rnb').stop().fadeIn(500);
    if(n == 1) $('.main-scroll-arrow').stop().fadeIn(500);
}
function main_item_hide(){
    $('.l-header').stop().fadeOut(500);
    $('.s-scroll-nav').stop().fadeOut(500);
    $('.c-btn__top').stop().fadeOut(500);
    $('.c-btn__rnb').stop().fadeOut(500);
    $('.main-scroll-arrow').stop().fadeOut(500);
}

function works_gallery_resize(w){
    var mv_size;
    var c_idx = $('.s-works__g-box >ul >li.on').index();
    var item_w = w;
    mv_size = item_w * c_idx;

    $('.s-works__g-box').stop().animate({left: "-" + mv_size + 'px'}, 300, 'easeInOutExpo');
}