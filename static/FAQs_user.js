var jumboHeight = $(".jumbotron").outerHeight();
function parallax() {
  var o = $(window).scrollTop();
  $(".jumbotron").css("background-position", "center " + -0.2 * o + "px"),
    console.log(jumboHeight - o);
}
$(window).scroll(function (o) {
  parallax();
});
