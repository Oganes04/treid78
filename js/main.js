$(function(){

  $('.main-margin').css('margin-top', $('.header').outerHeight());

  $(window).on('resize', function() {

    $('.main-margin').css('margin-top', $('.header').outerHeight());

  });

  if ($(window).scrollTop() > 20) {

    $('.header').addClass('header--active');

  } else {

    $('.header').removeClass('header--active');

  }

  $(window).on('scroll', function() {

    if ($(window).scrollTop() > 20) {

      $('.header').addClass('header--active');

    } else {

      $('.header').removeClass('header--active');

    }

  });
  
});

$(document).ready(function() {

  if ($('.leasing').length) {

    const leasingMarquee = $("#leasing__line-inner");
    const leasingWidth = $('.leasing__items').outerWidth();

    let clientsI = 0
    let interval

    $('#leasing__line').css('-webkit-transform', `translateX(${-leasingWidth}px)`);
    $('#leasing__line').css('-ms-transform', `translateX(${-leasingWidth}px)`);
    $('#leasing__line').css('transform', `translateX(${-leasingWidth}px)`);

    leasingMarquee.append(leasingMarquee.find("ul").clone());
    leasingMarquee.append(leasingMarquee.find("ul").clone());

    function reset() {

      clientsI = clientsI  - 0.8;

      $('#leasing__line-inner').css('-webkit-transform', `translateX(${clientsI}px)`);
      $('#leasing__line-inner').css('-ms-transform', `translateX(${clientsI}px)`);
      $('#leasing__line-inner').css('transform', `translateX(${clientsI}px)`);

      if (clientsI <= -leasingWidth) {

        clientsI = 0
        clientsI = clientsI - 0.8;

      }

    }

    interval = setInterval(reset, 15);

  }

});