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
        768:{
            items:2
        },
        992:{
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