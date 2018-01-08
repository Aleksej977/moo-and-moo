$(document).ready(function () {
    $('.slick').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
    },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
    },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
    }

  ]
    });
});

$('#modal').iziModal({
    theme: "light",
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    overlayClose: true,
    closeOnEscape: true,
    closeButton: true,
    bodyOverflow: true
});
$(document).on('click', '.open-form', function (event) {
    event.preventDefault();
    $('#modal').iziModal('open', this); // Do not forget the "this"
});