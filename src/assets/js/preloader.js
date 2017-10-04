
$(document).ready(function(){
	function toggleFlurries(){
		$(this).toggleClass('active');
		$('.snow').toggleClass('flurries')
	}
	// Fade out snow effect and add toggle function to snowflake icon
	function endFlurries(){
		$('.action-banner-bg').css('will-change', 'opacity').addClass('loaded');
		setTimeout(function(){
			$('#snow-toggle').fadeIn();
			$('#snow-toggle').removeClass('active');
			$('.snow').css('will-change', 'opacity').addClass('flurries');
			$('#snow-toggle').on('click', toggleFlurries);
		}, 5500);
	}

	endFlurries();
	$('#nav').localScroll();
	$('#nav').on('click', function() {
		$('body').clearQueue();
		$(event.target).blur();
	});

	window.addEventListener("wheel", function(){$('body').stop();},{passive:true});
});
