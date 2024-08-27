$(function(){

  $('.main-margin').css('margin-top', $('.header').outerHeight());

  $(window).on('resize', function() {

    $('.main-margin').css('margin-top', $('.header').outerHeight());

  });

  $('.main-catalog__item:last-child').css('height', $('.main-catalog__item:first-child').outerHeight());

  $(window).on('resize', function() {
  
    $('.main-catalog__item:last-child').css('height', $('.main-catalog__item:first-child').outerHeight());

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

  function delay(f) {

    let isCooldown = false;

    return function() {

      if (isCooldown) return;

      f.apply(this, arguments);

      isCooldown = true;

      setTimeout(() => isCooldown = false, 200);

    };

  }

  function menu() {

    if ($('.header__burger').hasClass('header__burger--active')) {

      setTimeout(() => {

        $(this).removeClass('header__burger--active');

      }, 200);

      $('.header__inner-menu').removeClass('header__inner-menu--active');
      $('body').removeClass('hidden');

    } else {

      $(this).addClass('header__burger--active');

      $('.header__inner-menu').addClass('header__inner-menu--active');
      $('body').addClass('hidden');

    }

    if ($('.header__burger').hasClass('header__burger--active-transit')) {

      $(this).removeClass('header__burger--active-transit');

    } else {

      setTimeout(() => {

        $(this).addClass('header__burger--active-transit');

      }, 200);

    }

  }

  document.getElementById('header-burger').addEventListener('click', delay(menu));

});