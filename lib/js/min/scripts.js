$(function () {

    $('.full-banner, .banner-empresa').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                dots: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: false
            }
        }
    ]
    });

    $.getJSON("receitas/receitas.json", function (data) {
        $.each(data, function (i, val) {
            var id = val.id;
            var title = val.title;
            var subtitle = val.subtitle;
            var text1 = val.text1;
            var image = val.image;
            var video = val.video;
            var ingredientes = val.ingredientes;
            var preparo = val.preparo;
            var preparo1 = val.preparo[0].passo1;
            var preparo2 = val.preparo[1].passo2;
            var preparo3 = val.preparo[2].passo3;
            var preparo4 = val.preparo[3].passo4;
            var preparo5 = val.preparo[4].passo5;
            var preparo6 = val.preparo[5].passo6;
            var preparo7 = val.preparo[6].passo7;
            var text2 = val.text2;

            $('#receitas').append('<div class=\"itens-receitas\" data-toggle="modal" data-target="#'+ id +'"><div class=\"img\"><img src=\"images/receitas/' + image + '\" /></div>' +
            '<h4>' + title + '</h4> <p>' + subtitle + '</p>' +
            '<a href="javascript:;">Ver a receita</a></div>');

            $('#receitasmodal').append(
                '<div class="modal fade" id="'+ id +'" tabindex="-1" role="dialog" aria-labelledby="myModal'+ id +'">' +
                '<div class="modal-dialog" role="document">' +
                '  <div class="modal-content">' +
                '    <div class="modal-header">' +
                '      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '      <h4 class="modal-title"id="myModal'+ id +'">' + title + '</h4>' +
                '    </div>' +
                '    <div class="modal-body">' +
                '      <h4>' + subtitle + '</h4>' +
                '      <div>' + ((video == '') ? '<img src=\"images/receitas/' + image + '\" />' : '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + video + '"></iframe></div>') + '</div>' +
                '      <h5>' + text1 + '</h5>' +
                '      <p><strong>Ingredientes: </strong>' + ingredientes + '</p>' +
                '      <p><strong>Modo de preparo: </strong>' + preparo1 + preparo2 + preparo3 + preparo4 + preparo5+ preparo6 + preparo7 + '</p>' +
                '      <h5>' + text2 + '</h5>' +
                '    </div>' +
                '    <div class="modal-footer">' +
                '      <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>' +
                '    </div>' +
                '  </div>' +
                '</div>' +
            '</div>'
            );

        });
    });

    setTimeout(function () {
        $('.receitas').slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            dots: false,
            infinite: true,
            speed: 500,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]
        });
    }, 700);

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

    $("#navbar-primary-collapse a, a.btn-link").on('click', function (event) {
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

    if(window.innerWidth <= 1000){
        console.log("oi")
        $("#navbar-primary-collapse a").on('click', function(){
            $("#navbar-primary-collapse").removeClass("in");
        });
    }

});