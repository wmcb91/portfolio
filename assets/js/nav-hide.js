$(document).ready(function(){

  if (document.body.clientWidth > 980) {
    $(".navbar").hide();

    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $('.navbar').fadeIn();
          $('.over-image-title').fadeOut(1500);
        } else {
          $('.navbar').fadeOut();
          $('.over-image-title').fadeIn();
        }
      });
    });
  } else {
    return;
  }

});
