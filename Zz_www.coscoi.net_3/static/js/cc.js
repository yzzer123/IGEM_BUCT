var mcs_data = [["01","GO EAST","63","95","91","87"],["02","SLOO","64","96","92","88"],["03","NOBAH","69","97","94","90"]];
var main_cs_idx = 1;
var mcs_item_p = $('.main-cont__slide-in >ul');
var mcs_size = mcs_item_p.find('>li').size()
var mcs_left = mcs_size * 100;
var db_click = 0;
var main_vis_x = 0;
var is_move = false;
var is_move_s = false;
var mcs_item_org = $('.main-cont__slide-in >ul >li');


var	halfWindowH = $(window).height()*0.5,
    halfWindowW = $(window).width()*0.5,
    //define a max rotation value (X and Y axises)
    maxRotationY = 5,	//default 5
    maxRotationX = 3,	//default 3
    maxRotationY2 = 10,	//default 5
    maxRotationX2 = 6,	//default 3
    aspectRatio = 2;

$( function () {
    main_cont_slide_btn(1);
    main_cont_slide_set(0);

    $('.main-cont__slide-btn--next').click(function(){
        main_cont_slide_next();
    });
    $('.main-cont__slide-btn--prev').click(function(){
        main_cont_slide_prev();
    });

    //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
    $(window).on('resize', function(){
        if( $('html').hasClass('preserve-3d') ) {
            window.requestAnimationFrame(function(){
                halfWindowH = $(window).height()*0.5,
                halfWindowW = $(window).width()*0.5;
            });
        } else {
            $('.main-cont__slide-box').attr('style', '');
            $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
        }
    });





    $('.main-cont__start-box').mouseleave(function(){
        mcs_item_p.css({left : '-'+mcs_left+'%'});
        is_move_s = false;
    });
    
    
    var filter = "win16|win32|win64|mac";

    if (navigator.platform ) {
    	if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
    		$('.main-contents').on( "mousedown touchstart", function(e){
    	        //e.preventDefault();
    	        main_vis_y = e.pageY || e.originalEvent.changedTouches[0].pageY;
    	    }).on( "mouseup touchend", function(e){
    	    	var m_c_inx = $('#main__nav .s-scroll-nav__item.on').index();
    	        var m_endy = e.pageY || e.originalEvent.changedTouches[0].pageY;
    	        if(m_c_inx == 0){
    	        	if( Math.abs(m_endy - main_vis_y) > 80){
    	                if( main_vis_y > m_endy ){
    	                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx+1)).trigger('click');
    	                } 
    	            }
    	        } else if(m_c_inx == 1){
    	        	if( Math.abs(m_endy - main_vis_y) > 80){
    	                if( main_vis_y < m_endy ){
    	                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx-1)).trigger('click');
    	                } else {
    	                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx+1)).trigger('click');
    	                }
    	            }
    	        } else if(m_c_inx == 2){
    	        	if( Math.abs(m_endy - main_vis_y) > 80){
    	                if( main_vis_y < m_endy ){
    	                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx-1)).trigger('click');
    	                } 
    	            }
    	        }
    	        
    	    });
    	} else {
    		
    	}
    }


    
    
    /*$('.main-contents').on( "mousedown touchstart", function(e){
    	
        //e.preventDefault();
        main_vis_y = e.pageY || e.originalEvent.changedTouches[0].pageY;
        console.log("터치:"+main_vis_y);
    }).on( "mouseup touchend", function(e){
    	var m_c_inx = $('#main__nav .s-scroll-nav__item.on').index();
        var m_endy = e.pageY || e.originalEvent.changedTouches[0].pageY;
        if(m_c_inx == 0){
        	if( Math.abs(m_endy - main_vis_y) > 80){
                if( main_vis_y > m_endy ){
                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx+1)).trigger('click');
                } 
            }
        } else if(m_c_inx == 1){
        	if( Math.abs(m_endy - main_vis_y) > 80){
                if( main_vis_y < m_endy ){
                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx-1)).trigger('click');
                } else {
                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx+1)).trigger('click');
                }
            }
        } else if(m_c_inx == 2){
        	if( Math.abs(m_endy - main_vis_y) > 80){
                if( main_vis_y < m_endy ){
                	$('#main__nav .s-scroll-nav__item').eq((m_c_inx-1)).trigger('click');
                } 
            }
        }
        
    });*/
    
});
function main_cont_end(){
    main_cont_slide_set(0);
    $('.main-cont__start-box').css('display','none');

}
function main_cont_start(){

    var main_rect = Snap("#main-cont_rect");
    var innerRect = main_rect.select('rect');
    Snap.animate(2000,0, function( value ){
        innerRect.attr({ 'strokeDashoffset': value })
    },2000 );
    main_cont_slide_set(0);
    main_cont_slide_btn(1);
    $('.main-cont__title').stop().fadeIn('300');
    $('.main-cont__start-box >div:eq(2)').stop().delay(1000).fadeOut();
    $('.main-cont__start-box >div:eq(0)').stop().fadeIn().delay(1000).fadeOut();
    $('.main-cont__start-box >div:eq(1)').stop().delay(1000).fadeIn('300',function(){
        $(this).find('>div').stop().animate({width:55.8+'%'} , 1000, 'easeOutExpo',function(){
        	
            main_cont_slide_get(1);
            $('.main-cont__slide').stop().fadeIn('300');
            $('.main-cont__start-box').stop().fadeOut('300');
            $('.main-cont__slide-btn--active').stop().show();
            $('.main-cont__slide-btn').stop().show();

            main_item_show();
        });
    });

}

function main_cont_slide_next(){
    var c_idx = $('.main-cont__slide-in >ul >li.on').attr('data-val');
    var n_idx = $('.main-cont__slide-in >ul >li.on').next().attr('data-val');
    var mcs_item = $('.main-cont__slide-in >ul >li');
    if(db_click == 0){
        db_click = 1;
        
        main_cont_slide_set(c_idx);
        main_cont_slide_get(n_idx);
        $('.main-cont__slide-in > ul').stop().animate({left: '-'+(mcs_left+100)+'%'},700,'easeInOutExpo',function(){
            $('.main-cont__slide-in >ul >li.on').removeClass('on').next().addClass('on');
            mcs_item.eq(0).clone().appendTo(mcs_item_p);
            mcs_item.eq(0).remove();
            mcs_item_p.css('left','-'+mcs_left+'%');
            main_cont_slide_btn(n_idx);
            main_cs_idx = n_idx;
            db_click = 0;
            is_move = false;
        });
    }

}
function main_cont_slide_prev(){
    var c_idx = $('.main-cont__slide-in >ul >li.on').attr('data-val');
    var n_idx = $('.main-cont__slide-in >ul >li.on').prev().attr('data-val');
    var mcs_item = $('.main-cont__slide-in >ul >li');
    var mcs_item_last = $('.main-cont__slide-in >ul >li:last-child');
    if(db_click == 0){
        db_click = 1;
        main_cont_slide_set(c_idx);
        main_cont_slide_get(n_idx);
        $('.main-cont__slide-in > ul').stop().animate({left: '-'+(mcs_left-100)+'%'},700,'easeInOutExpo',function(){
            $('.main-cont__slide-in >ul >li.on').removeClass('on').prev().addClass('on');
            mcs_item_last.clone().prependTo(mcs_item_p);
            mcs_item_last.remove();
            mcs_item_p.css('left','-'+mcs_left+'%');
            main_cont_slide_btn(n_idx);
            main_cs_idx = n_idx;
            db_click = 0;
            is_move = false;
        });
    }

}
function main_cont_slide_set(idx){
    var mcs_item = $('.main-cont__slide-in >ul >li');
    var c_idx = idx-1;       
    
    if(idx == 0){

        //mcs_item.each(function(){
            //if($(this).attr('data-val-c') == '1'){
                //$(this).remove();
            //}
        //});
        mcs_item.removeClass('on');        
        mcs_item_p.html(mcs_item_org);
                
    	for(i=(mcs_size-1);i>=0;i--){    		            
            mcs_item_org.eq(i).clone().attr('data-val-c','1').prependTo(mcs_item_p);                                               
        }
       
        $('.main-cont__slide-in >ul >li').eq(mcs_size).addClass('on');
        $('.main-cont__slide-in > ul').css('left','-'+mcs_left+'%');

        $('.mcv-s1-i1 >img').stop().css({width:'0'});
        $('.mcv-s1-i2').stop().css({top:'-500px'});
        $('.mcv-s1-i3 >img').stop().css({width:'0'});
        $('.mcv-s1-i4').stop().css({top:'-500px'});
        $('.mcv-s1-i5').stop().css({top:'-500px'});
        $('.mcv-s1-i6').stop().css({top:'-500px'});
        $('.mcv-s1-i7').stop().css({bottom:'-500px'});
        $('.main-cont__vis1-1').stop().css({display:'none'});
        $('.main-cont__vis1').stop().css({display:'none'});

        $('.main-cont__vis2-1').stop().css({display:'none'});
        $('.main-cont__vis2').stop().css({display:'none'});
        $('.mcv-s2-i1').stop().css({bottom:'-500px'});

        $('.main-cont__vis3-1').stop().fadeOut(700);
        $('.main-cont__vis3').stop().fadeOut(700);
        $('.mcv-s3-i1').stop().css({height:'0'});
        $('.mcv-s3-i2').stop().css({bottom:'-500px'});
        $('.mcv-s3-i3').stop().css({bottom:'-700px'});
        $('.mcv-s3-i4').stop().css({bottom:'-500px'});
        $('.mcv-s3-i5').stop().css({top:'-500px'});
        $('.mcv-s3-i6').stop().css({top:'-500px'});
        $('.mcv-s3-i7').stop().css({top:'-500px'});

        $('.main-cont__slide').stop().css({display:'none'});
        $('.main-cont__slide-btn--active').stop().css({display:'none'});
        $('.main-cont__slide-btn').stop().css({display:'none'});
        $('.main-cont__start-box > div:nth-child(2) > div').stop().css({width:'150px'});
        $('.main-cont__start-box > div:nth-child(3)').stop().css({display:'block'});


    } else if(idx == 1){
    	
        $('.mcv-s1-i1 >img').stop().animate({width:'0'},500);
        $('.mcv-s1-i2').stop().animate({top:'-500px'},400);
        $('.mcv-s1-i3 >img').stop().animate({width:'0'},300);
        $('.mcv-s1-i4').stop().animate({top:'-500px'},200);
        $('.mcv-s1-i5').stop().animate({top:'-500px'},600);
        $('.mcv-s1-i6').stop().animate({top:'-500px'},700);
        $('.mcv-s1-i7').stop().animate({bottom:'-500px'},200);
        $('.main-cont__vis1-1').stop().fadeOut(700);
        $('.main-cont__vis1').stop().fadeOut(700);
    } else if(idx == 2){
    	
    	$('.main-cont__vis3-1').stop().fadeOut(700);
        $('.main-cont__vis3').stop().fadeOut(700);
        $('.mcv-s3-i1').stop().animate({height:'0'} , 500);
        $('.mcv-s3-i2').stop().animate({bottom:"-500px"} , 300);
        $('.mcv-s3-i3').stop().animate({bottom:"-700px"} , 500);
        $('.mcv-s3-i4').stop().animate({bottom:"-500px"} , 400);
        $('.mcv-s3-i5').stop().animate({top:"-500px"} , 300);
        $('.mcv-s3-i6').stop().animate({top:"-500px"} , 200);
        $('.mcv-s3-i7').stop().animate({top:"-500px"} , 100);
    } else if(idx == 3){
    	
    	$('.main-cont__vis2-1').stop().fadeOut(700);
        $('.main-cont__vis2').stop().fadeOut(700);
        $('.mcv-s2-i1').stop().animate({bottom:'-500px'} , 200);        
    }

}

function main_cont_slide_get(idx){
    var vis_item = $('.main-cont__vis-n'+idx);

    $('.main-cont__vis-n'+idx+'-1').on('mousemove', function(event){
        var wrapperOffsetTop = $(this).offset().top;
        if( $('html').hasClass('preserve-3d') ) {
            window.requestAnimationFrame(function(){
                moveBackground(event, wrapperOffsetTop,idx);
            });
        }
    });

    $('.main-cont__vis-n'+idx+'-1').on( "mousedown touchstart", function(e){
        e.preventDefault();
        main_vis_x = e.pageX || e.originalEvent.changedTouches[0].pageX;
        is_move_s = true;
    }).on( "mousemove touchmove", function(e){

        if(!is_move && is_move_s){
            var mv_x = e.pageX || e.originalEvent.changedTouches[0].pageX;
            var c_x = ((main_vis_x - mv_x)/25) + mcs_left;
            mcs_item_p.css('left','-' + c_x + '%');
        }

    }).on( "mouseup touchend", function(e){
        is_move = true;
        is_move_s = false;
        var endX = e.pageX || e.originalEvent.changedTouches[0].pageX;

        if( Math.abs(endX - main_vis_x) > 200){
            if( main_vis_x > endX ){
                main_cont_slide_next();
            } else {
                main_cont_slide_prev();
            }
        } else {
            mcs_item_p.animate({left : '-'+mcs_left+'%'}, 500, 'easeOutExpo',function(){
                is_move = false;
                is_touch_start = false;
            });
        }
    });

    if(idx == 1){
    	
        $('.main-cont__vis1-1').stop().fadeIn(700);
        $('.main-cont__vis1').stop().fadeIn(700);
        $('.mcv-s1-i1 >img').stop().animate({width:100+'%'} , 500, 'easeOutBounce');
        vis_item.find('.mcv-s1-i2').stop().delay(400).animate({top:41+'%'} , 1000, 'easeOutBounce');
        $('.mcv-s1-i3 >img').stop().animate({width:100+'%'} , 1000, 'easeOutBounce');
        vis_item.find('.mcv-s1-i4').stop().delay(300).animate({top:45+'%'} , 1000, 'easeOutBounce');
        vis_item.find('.mcv-s1-i5').animate({top:30+'%'} , 1000, 'easeOutBounce');
        $('.mcv-s1-i6').stop().delay(900).animate({top:4+'%'} , 1000, 'easeOutBounce');
        $('.mcv-s1-i7').stop().delay(900).animate({bottom:"-"+23+'%'} , 1000, 'easeOutBounce');
    } else if(idx == 2){
    	
    	$('.main-cont__vis3-1').stop().fadeIn(700);
        $('.main-cont__vis3').stop().fadeIn(700);
        $('.mcv-s3-i1').stop().animate({height:'100%'} , 500, 'easeOutExpo');
        $('.mcv-s3-i2').stop().animate({bottom:"-"+3+'%',left:"27%"} , 1200, 'easeOutExpo');
        $('.mcv-s3-i3').stop().animate({bottom:"-"+9+'%'} , 800, 'easeOutBounce');
        $('.mcv-s3-i4').stop().animate({bottom:"-"+29+'%'} , 1200, 'easeOutBounce');
        $('.mcv-s3-i5').stop().animate({top:"-"+7+'%'} , 1200, 'easeOutBounce');
        $('.mcv-s3-i6').stop().animate({top:"-"+24+'%'} , 1200, 'easeOutExpo');
        $('.mcv-s3-i7').stop().animate({top:"-"+31+'%'} , 1200, 'easeOutExpo');
    } else if(idx == 3){
    	
    	$('.main-cont__vis2-1').stop().fadeIn(700);
        $('.main-cont__vis2').stop().fadeIn(700);
        $('.mcv-s2-i1').stop().animate({bottom:-2+'%'} , 1200, 'easeOutBounce');        
    }

}

function main_cont_slide_btn(idx){
    var prev_n,next_n,active_n;
    var c_idx =  idx*1;
    if(mcs_size > c_idx){
        if(c_idx == 1){
            prev_n = mcs_size-1;
        } else {
            prev_n = c_idx-2;
        }
        next_n = c_idx;
    } else if(mcs_size == c_idx){

        if(prev_n < 2){
            prev_n = c_idx-1;
        } else {
            prev_n = c_idx-2;
        }
        next_n = 0;
    }
    active_n = c_idx-1;
    
    var langDATA = $(".main-cont__slide-btn--active").attr("data-lang");
    
    //console.log("active: "+mcs_data[active_n][1]);
    
    $('.main-cont__slide-btn--prev .mc-num').html(mcs_data[prev_n][0]);
    $('.main-cont__slide-btn--next .mc-num').html(mcs_data[next_n][0]);
    $('.main-cont__slide-btn--active .mc-num').html(mcs_data[active_n][0]);
    
    //prev
    if(mcs_data[prev_n][1] == "GO EAST"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--prev .mc-name').html("ドンユキ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--prev .mc-name').html("东游记");
        }else{
        	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);	
        }	
    }else if(mcs_data[prev_n][1] == "NOBAH"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--prev .mc-name').html("ノバ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);
        }else{
        	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);	
        }	
    }else if(mcs_data[prev_n][1] == "SLOO"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--prev .mc-name').html("ス-ル");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);
        }else{
        	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);	
        }	
    }else{
    	$('.main-cont__slide-btn--prev .mc-name').html(mcs_data[prev_n][1]);
    }
    
    
  //next
    if(mcs_data[next_n][1] == "GO EAST"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--next .mc-name').html("ドンユキ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--next .mc-name').html("东游记");
        }else{
        	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);	
        }	
    }else if(mcs_data[next_n][1] == "NOBAH"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--next .mc-name').html("ノバ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);
        }else{
        	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);	
        }	
    }else if(mcs_data[next_n][1] == "SLOO"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--next .mc-name').html("ス-ル");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);
        }else{
        	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);	
        }	
    }else{
    	$('.main-cont__slide-btn--next .mc-name').html(mcs_data[next_n][1]);
    }
    
    
    //active
    if(mcs_data[active_n][1] == "GO EAST"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--active .mc-name').html("ドンユキ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--active .mc-name').html("东游记");
        }else{
        	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);	
        }	
    }else if(mcs_data[active_n][1] == "NOBAH"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--active .mc-name').html("ノバ");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);
        }else{
        	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);	
        }	
    }else if(mcs_data[active_n][1] == "SLOO"){
    	if(langDATA == '0003'){
    		$('.main-cont__slide-btn--active .mc-name').html("ス-ル");
        }else if(langDATA == '0004'){
        	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);
        }else{
        	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);	
        }	
    }else{
    	$('.main-cont__slide-btn--active .mc-name').html(mcs_data[active_n][1]);
    }
    
    if(langDATA == '0001'){
    	$('.main-cont__slide-btn--active').attr("data-menu-seq",mcs_data[active_n][2]);	
    }else if(langDATA == '0002'){
    	$('.main-cont__slide-btn--active').attr("data-menu-seq",mcs_data[active_n][5]);
    }else if(langDATA == '0003'){
    	$('.main-cont__slide-btn--active').attr("data-menu-seq",mcs_data[active_n][4]);
    }else if(langDATA == '0004'){
    	$('.main-cont__slide-btn--active').attr("data-menu-seq",mcs_data[active_n][3]);
    }else{
    	$('.main-cont__slide-btn--active').attr("data-menu-seq",mcs_data[active_n][2]);
    }
    
    

}

function moveBackground(event, topOffset,idx) {
    var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
        yPosition = event.pageY - topOffset,
        rotateX = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX,
        rotateY2 = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY2,
        yPosition2 = event.pageY - topOffset,
        rotateX2 = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX2;

    if( rotateY > maxRotationY) rotateY = maxRotationY;
    if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
    if( rotateX > maxRotationX) rotateX = maxRotationX;
    if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

    if( rotateY2 > maxRotationY2) rotateY2 = maxRotationY2;
    if( rotateY2 < -maxRotationY2 ) rotateY2 = -maxRotationY2;
    if( rotateX2 > maxRotationX2) rotateX2 = maxRotationX2;
    if( rotateX2 < -maxRotationX2 ) rotateX2 = -maxRotationX2;

    $('.main-cont__vis'+idx+' .cd-floating-background').css({
        '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
    });

    $('.main-cont__vis'+idx+'-1').css({
        '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
        'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(100px)',
    });


    $('.main-cont__slide-box').css({
        '-moz-transform': 'rotateX(' + rotateX2 + 'deg' + ') rotateY(' + rotateY2 + 'deg' + ') translateZ(100px)',
        '-webkit-transform': 'rotateX(' + rotateX2 + 'deg' + ') rotateY(' + rotateY2 + 'deg' + ') translateZ(100px)',
        '-ms-transform': 'rotateX(' + rotateX2 + 'deg' + ') rotateY(' + rotateY2 + 'deg' + ') translateZ(100px)',
        '-o-transform': 'rotateX(' + rotateX2 + 'deg' + ') rotateY(' + rotateY2 + 'deg' + ') translateZ(100px)',
        'transform': 'rotateX(' + rotateX2 + 'deg' + ') rotateY(' + rotateY2 + 'deg' + ') translateZ(100px)',
    });

}

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
var element = document.createElement('p'),
html = document.getElementsByTagName('html')[0],
body = document.getElementsByTagName('body')[0],
propertys = {
'webkitTransformStyle':'-webkit-transform-style',
'MozTransformStyle':'-moz-transform-style',
'msTransformStyle':'-ms-transform-style',
'transformStyle':'transform-style'
};

body.insertBefore(element, null);

for (var i in propertys) {
if (element.style[i] !== undefined) {
element.style[i] = "preserve-3d";
}
}

var st = window.getComputedStyle(element, null),
transform = st.getPropertyValue("-webkit-transform-style") ||
        st.getPropertyValue("-moz-transform-style") ||
        st.getPropertyValue("-ms-transform-style") ||
        st.getPropertyValue("transform-style");

if(transform!=='preserve-3d'){
html.className += ' no-preserve-3d';
} else {
html.className += ' preserve-3d';
}
document.body.removeChild(element);

})();
