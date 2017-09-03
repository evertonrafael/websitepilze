$(function () {

    $('.full-banner').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1
    });

    $('.receitas').slick({
        dots: false,
        infinite: true,
        speed: 500
    });

    function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 300,
                header = $(".logotipo");
            if (distanceY > shrinkOn) {
                header.addClass("small");
            } else {
                if (header.hasClass("small")) {
                    header.removeClass("small");
                }
            }
        });
    }
    window.onload = init();

});