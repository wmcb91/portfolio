function endFlurries(){
	$('.action-banner-bg').addClass('loaded');
	setTimeout(function(){
		$('.snow').addClass('flurries');
	}, 8000);

}

$(document).ready(function(){
	endFlurries();
});
