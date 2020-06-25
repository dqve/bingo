$(".bingo-card__item").on('click', function() {
  $(this).toggleClass('active');
});

$('.clear-button').on('click', function(){
	$('.bingo-card__item').removeClass('active');
});