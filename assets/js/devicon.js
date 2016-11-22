var expand = function() {
  $('.dev').show();
};

var shrink = function() {
  $('.dev').show();
};

jQuery(document).ready(function () {
  $('.devicon').mouseenter(expand).mouseleave(shrink);
  $('.dev').on('click', expand);
  $('.dev js dev-expanded').hide();
});
