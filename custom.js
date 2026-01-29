$(window).scroll(function(){
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 200);
  });
$("#load-more").on("click", function () {
    const el = document.querySelector(".content-load-more");

    el.style.maxHeight = el.scrollHeight + "px";

    $("#load-more").addClass("d-none");
    $("#load-less").removeClass("d-none");
});

$("#load-less").on("click", function () {
    const el = document.querySelector(".content-load-more");

    el.style.maxHeight =  "0px";

    $("#load-more").removeClass("d-none");
    $("#load-less").addClass("d-none");
});
