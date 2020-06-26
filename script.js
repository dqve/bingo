$(".bingo-card__item").on('click', function() {
  $(this).toggleClass('active');
  console.log("click")
});

$('.clear-button').on('click', function(){
	$('.bingo-card__item').removeClass('active');
});
