// owl-carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    item: 3,
    margin:20,
    nav:true,
    center:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

// light-box
lightbox.option({
    'resizeDuration': 200,
    'positionFromTop' : 50,
    'wrapAround': true,
    'alwaysShowNavOnTouchDevices' : true,
})