$(document).ready(function(){

  if (document.body.clientWidth > 480) {
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > (window.innerHeight * 0.4)) {
          $('.nav-reaction').fadeIn();
          $('.over-image-title').fadeOut(850);
        } else {
          $('.nav-reaction').fadeOut();
          $('.over-image-title').fadeIn(650);
        }
      });
    });
  } if (document.body.clientWidth === 768 ||
        document.body.clientWidth === 736 ||
        document.body.clientWidth === 732 ||
        document.body.clientWidth === 667 ||
        document.body.clientWidth === 640 ||
        document.body.clientWidth === 568
        ) {
    $('.tip-info').show();
  } if (document.body.clientWidth <= 480) {
    $('.nav-reaction').show();
    $('.tip-info').show();
  }
});
