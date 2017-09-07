$(function () {

    $('.full-banner').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1
    });

    $.getJSON("receitas/receitas.json", function (data) {
        $.each(data, function (i, val) {
            var title = val.title;
            var text = val.text;
            var image = val.image;
            var video = val.video;

            $('#receitas').append('<div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 class=\"panel-title\">' + title + '</h3></div>'
                                     + '<div class=\"panel-body\">' + text + '</div>' + '<div>' + image + '</div>'+ '<div>' + video + '</div></div><div>');
        });
    });

    setTimeout(function () {
        $('.receitas').slick({
            dots: false,
            infinite: true,
            speed: 500
        });
    }, 100);

    function init() {
        window.addEventListener('scroll', function (e) {
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

    $('body').scrollspy({
        target: ".navbar",
        offset: 50
    });
    $("#navbar-primary-collapse a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 300, function () {
                window.location.hash = hash;
            });
        }
    });

});