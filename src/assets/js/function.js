$(document).ready(function() {	
						   
	//Custom Scroll Bar
	
	$(".articleDetails .articleDetailsWrapper .articleWrapper").mCustomScrollbar({
		axis:"x",
		theme:"dark-thick"
	});
	
	$('.menuToggle').click(function(){
		$(".mainMenu").addClass("tglMnu");
	});
	
	$(".closeBtn").click(function(e){
		e.preventDefault();
		$(this).parent().removeClass("tglMnu");
	});	
	
	$(".newsDetails .tabWrapper #headLines .panel-group .panel").click(function(){
		$(".newsDetails .tabWrapper #headLines .panel-group .panel").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".newsDetails .tabWrapper #clubNews .panel-group .panel").click(function(){
		$(".newsDetails .tabWrapper #clubNews .panel-group .panel").removeClass("active");
		$(this).addClass("active");
	});
	
	$("header .bottomHeader .rightNav > ul > .searchBtn a").click(function(e){
		e.stopPropagation();
		if ($(window).width() >= 480) {
			$("header .bottomHeader .rightNav > ul > .searchBtn .srchBar").animate({
                width: 265
            },100);
		}
		else
		{
			$("header .bottomHeader .rightNav > ul > .searchBtn .srchBar").animate({
                width: 195
            },100);
		}
														   
	});
	$("header .bottomHeader .rightNav > ul > .searchBtn .srchBar").click(function(e){
		e.stopPropagation();															   										   
	});
	
	
	$(document).click(function (e) {
		var container = $("header .bottomHeader .rightNav > ul > .searchBtn");

    	if (!container.is(e.target))
    	{
			$("header .bottomHeader .rightNav > ul > .searchBtn .srchBar").width(0);
		}
  	});
	
});

$(window).load(function() {
						
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$($(e.target).attr('href'))
			.find('.owl-carousel')
			.owlCarousel('invalidate', 'width')
			.owlCarousel('update')
	});
	
	$('.matchDetailsSlider').owlCarousel({
		margin: 30,
		nav: true,
		loop: true,
		responsive: {
		  0: {
			items: 1
		  },
		  480: {
			items: 2
		  },
		  600: {
			items: 3
		  },
		  992: {
			items: 5
		  },
		  1200: {
			items: 8
		  }
		}
	});
	$( ".matchDetailsSlider .owl-prev").html('<img src="images/slider_lft_arow.png" alt="" />');
	$( ".matchDetailsSlider .owl-next").html('<img src="images/slider_rght_arow.png" alt="" />');		
     

	$('.socialDetailsSlider').owlCarousel({    									  
		items: 1,
		margin: 0,
		nav: true,
		loop: true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true
	});
	$( ".socialDetailsSlider .owl-prev").html('<img src="images/social_slider_top_arow.png" alt="" />');
	$( ".socialDetailsSlider .owl-next").html('<img src="images/social_slider_bottom_arow.png" alt="" />');		
	
	$('.latestNewsDetailsSlider').owlCarousel({
		margin: 30,
		nav: true,
		loop: true,
		responsive: {
		  0: {
			items: 1
		  },
		  480: {
			items: 2
		  },
		  600: {
			items: 3
		  },
		  992: {
			items: 4
		  },
		  1200: {
			items: 5
		  }
		}
	});
	$( ".latestNewsDetailsSlider .owl-prev").html('<img src="images/slider_lft_arow.png" alt="" />');
	$( ".latestNewsDetailsSlider .owl-next").html('<img src="images/slider_rght_arow.png" alt="" />');	
	
});