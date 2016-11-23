$(document).ready(function(){

  if (document.body.clientWidth > 980) {
    $(".navbar").hide();

    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > (window.innerHeight * 0.2)) {
          $('.navbar').fadeIn();
          $('.over-image-title').fadeOut(1050);
        } else {
          $('.navbar').fadeOut();
          $('.over-image-title').fadeIn(350);
        }
      });
    });
  } else {
    return;
  }

});
