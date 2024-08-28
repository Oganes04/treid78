$(function() {

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

$(function() {

  if ($('.main-catalog').length) {

    $('.catalog__top-btn').each(function() {

      setTimeout(() => {

        $(this).css('width', $(this).outerWidth());

        if ($(this).hasClass('catalog__top-btn--active')) {

          $(this).css('width', $(this).outerWidth() + $(this).find('.catalog__top-btn--close').outerWidth());
    
        }

      }, 300);

    });

    $('.catalog__top-btn').on('click', function() {

      $(this).toggleClass('catalog__top-btn--active');

      if ($(this).hasClass('catalog__top-btn--active')) {

        $(this).css('width', $(this).outerWidth() + $(this).find('.catalog__top-btn--close').outerWidth());
  
  
      } else {

        $(this).css('width', $(this).outerWidth() - $(this).find('.catalog__top-btn--close').outerWidth());

      }

    });

    let $range = $('.catalog__filters-input--one')
    let $rangeTwo = $('.catalog__filters-input--two')

    let from = 0;

    let instance;
    let instanceTwo;

    $range.ionRangeSlider({

      type: 'double',
      onStart: updateInputs,
      onChange: updateInputs,

    });

    $rangeTwo.ionRangeSlider({

      type: 'double',
      onStart: updateInputsTwo,
      onChange: updateInputsTwo,

    });

    instance = $range.data('ionRangeSlider')
    instanceTwo = $rangeTwo.data('ionRangeSlider')

    function updateInputs(data) {

      from = data.from;
      to = data.to
    
      $('.catalog__filters-min-input--one').prop('value', from);
      $('.catalog__filters-max-input--one').prop('value', to)

      if (from > Number($('.catalog__filters-min-input--one').closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-min')) || to < Number($('.catalog__filters-min-input--one').closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-max'))) {
      
        $('.catalog__filters-min-input--one').closest('.catalog__filters-item').addClass('catalog__filters-item--active');

      } else {

        $('.catalog__filters-min-input--one').closest('.catalog__filters-item').removeClass('catalog__filters-item--active');

      }

    }

    function updateInputsTwo(data) {

      from = data.from;
      to = data.to
    
      $('.catalog__filters-min-input--two').prop('value', from);
      $('.catalog__filters-max-input--two').prop('value', to)

      if (from > Number($('.catalog__filters-min-input--two').closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-min')) || to < Number($('.catalog__filters-min-input--two').closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-max'))) {
      
        $('.catalog__filters-min-input--two').closest('.catalog__filters-item').addClass('catalog__filters-item--active');

      } else {

        $('.catalog__filters-min-input--two').closest('.catalog__filters-item').removeClass('catalog__filters-item--active');

      }

    }

    $('.catalog__filters-min-input').on('input', function() {

      let val = Number($(this).prop('value'));
      const max = $(this).closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-max')
      const min = $(this).closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-min')

      const value = $(this).val();
      const filteredValue = value.replace(/[^0-9]/g, '');

      $(this).val(filteredValue);

      if (val > min) {

        $(this).closest('.catalog__filters-item').addClass('catalog__filters-item--active');

      } else {

        $(this).closest('.catalog__filters-item').removeClass('catalog__filters-item--active');

      }
    
      if (val <= min) {

        val = min;

      } else if (val >= max) {

        val = max;
        $(this).prop('value', max);

      }

      if ($(this).attr('data-col') === '1') {
    
        instance.update({

          from: val

        });

      } else {

        instanceTwo.update({

          from: val

        });

      }

    });

    $('.catalog__filters-max-input').on('input', function(e) {

      let valMax = Number($(this).prop('value'));
      const max = $(this).closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-max')
      const min = $(this).closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-min')

      const value = $(this).val();
      const filteredValue = value.replace(/[^0-9]/g, '');

      $(this).val(filteredValue);

      if (valMax < max) {

        $(this).closest('.catalog__filters-item').addClass('catalog__filters-item--active');

      } else {

        $(this).closest('.catalog__filters-item').removeClass('catalog__filters-item--active');

      }
    
      if (valMax <= min) {

        valMax = max;

      } else if (valMax >= max) {

        valMax = max;
        $(this).prop('value', max)

      }

      if ($(this).attr('data-col') === '1') {
    
        instance.update({

          to: valMax

        });

      } else {

        instanceTwo.update({

          to: valMax

        });

      }

    });

    $('.catalog__first-box').on('click', function() {

      $(this).toggleClass('catalog__first--active');
      $('.catalog__first-items').slideToggle();

    });

    $('.catalog__first-item .form-content__checkbox').on('click', function() {

      $('.catalog__first-active').text($(this).find('.form-content__text').text().trim())

    });

    $(document).click(function(e){
  
      const list = $('.catalog__first, .catalog__first');
  
      if (e.target!=list[0]&&!list.has(e.target).length){ 
  
        $('.catalog__first-items').slideUp();
          
      }
      
    });

    if ($('.catalog__active-items li').length === 0) {

      $('.catalog__products-box').css('display', 'none');

    }

    $('.catalog__filters-item--checkbox').on('click', function() {

      $('.catalog__active-item--checkbox').remove();

      $('.catalog__names-item').each(function() {

        if ($(this).find('.form-content__input-checkbox').prop('checked')) {

          $('.catalog__products-box').css('display', 'block');

          if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 > $('.catalog__active').outerWidth()) {

            $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--checkbox">${$(this).find('.form-content__text').text().trim()}<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);


          }

          if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 < $('.catalog__active').outerWidth()) {

            $('.catalog__active-item:last-child').remove();

          }

        }

      });

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      } 

      $('.catalog__active-item--checkbox').on('click', function() {

        const $this = $(this);
  
        $('.catalog__names-item').each(function() {
  
          if ($this.text().trim() === $(this).find('.form-content__text').text().trim()) {
  
            $(this).find('.form-content__input-checkbox').prop('checked', false);
            $this.remove();
  
          }
  
        });

        if ($('.catalog__active-items li').length === 0) {

          $('.catalog__products-box').css('display', 'none');
    
        }
  
      });

      $('.catalog__active-clear').on('click', function() {

        $('.form-content__input-checkbox').prop('checked', false);
        $('.catalog__active-item--checkbox').remove();

        if ($('.catalog__active-items li').length === 0) {

          $('.catalog__products-box').css('display', 'none');
    
        }

      });

    });

    function lineChange(element) {

      setTimeout(() => {

        $('.catalog__products-box').css('display', 'block');

        if (element.attr('data-col') === '1') {

          $('.catalog__active-item--line-one').remove();

        } else {

          $('.catalog__active-item--line-two').remove();
          
        }

        if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 > $('.catalog__active').outerWidth()) {

          if (element.attr('data-col') === '1') {

            if (element.closest('.catalog__filters-item').find('.catalog__filters-min-input--one').val() > 0 || element.closest('.catalog__filters-item').find('.catalog__filters-max-input--one').val() < element.attr('data-max')) {

              $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--line-one">Грузоподъемность ${element.closest('.catalog__filters-item').find('.catalog__filters-min-input--one').val()} — ${element.closest('.catalog__filters-item').find('.catalog__filters-max-input--one').val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);

            } else {

              $('.catalog__active-item--line-one').remove();

            }

          } else {

            if (element.closest('.catalog__filters-item').find('.catalog__filters-min-input--two').val() > 0 || element.closest('.catalog__filters-item').find('.catalog__filters-max-input--two').val() < element.attr('data-max')) {

              $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--line-two">Масса ${element.closest('.catalog__filters-item').find('.catalog__filters-min-input--two').val()} — ${element.closest('.catalog__filters-item').find('.catalog__filters-max-input--two').val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);

            } else {

              $('.catalog__active-item--line-two').remove();

            }

          }

        }

        if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 < $('.catalog__active').outerWidth()) {

          $('.catalog__active-item:last-child').remove();

        }

        if ($('.catalog__active-items li').length === 0) {

          $('.catalog__products-box').css('display', 'none');
    
        }

      }, 1);

    }

    function lineInput(element) {

      $('.catalog__products-box').css('display', 'block');

      if (element.attr('data-col') === '1') {

        $('.catalog__active-item--line-one').remove();

      } else {

        $('.catalog__active-item--line-two').remove();
        
      }

      if (element.closest('.catalog__filters-item').find('.catalog__filters-input').attr('data-col') === '1') {

        if (element.closest('.catalog__filters-item').find('.catalog__filters-min-input--one').val() > element.attr('data-min') || element.closest('.catalog__filters-item').find('.catalog__filters-max-input--one').val() < element.attr('data-max')) {

          $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--line-one">Грузоподъемность ${$('.catalog__filters-min-input--one').val()} — ${$('.catalog__filters-max-input--one').val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);

        } else {

          $('.catalog__active-item--line-one').remove();

        }

      } else {

        if (element.closest('.catalog__filters-item').find('.catalog__filters-min-input--two').val() > element.attr('data-min') || element.closest('.catalog__filters-item').find('.catalog__filters-max-input--two').val() < element.attr('data-max')) {

          $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--line-two">Масса ${$('.catalog__filters-min-input--two').val()} — ${$('.catalog__filters-max-input--two').val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);

        } else {

          $('.catalog__active-item--line-two').remove();

        }

      }

      if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 < $('.catalog__active').outerWidth()) {

        $('.catalog__active-item:last-child').remove();

      }

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      }

    }

    $('.catalog__filters-input').on('change', function() {

      lineChange($(this));

      setTimeout(() => {
        
        $('.catalog__active-item--line-one').on('click', function() {;
      
          $('.catalog__filters-min-input--one').val($('.catalog__filters-input--one').attr('data-min'))
          $('.catalog__filters-max-input--one').val($('.catalog__filters-input--one').attr('data-max'))

          instance.update({

            from: $('.catalog__filters-input--one').attr('data-min'),
            to: $('.catalog__filters-input--one').attr('data-max')

          });

          $('.catalog__filters-item--one-line').removeClass('catalog__filters-item--active');

          if ($('.catalog__active-items li').length === 0) {

            $('.catalog__products-box').css('display', 'none');
      
          }
    
        });

        $('.catalog__active-item--line-two').on('click', function() {;
    
          $('.catalog__filters-min-input--two').val($('.catalog__filters-input--two').attr('data-min'))
          $('.catalog__filters-max-input--two').val($('.catalog__filters-input--two').attr('data-max'))

          instanceTwo.update({

            from: $('.catalog__filters-input--two').attr('data-min'),
            to: $('.catalog__filters-input--two').attr('data-max')

          });

          $('.catalog__filters-item--two-line').removeClass('catalog__filters-item--active');

          if ($('.catalog__active-items li').length === 0) {

            $('.catalog__products-box').css('display', 'none');
      
          }
    
        });

      }, 1);

      $('.catalog__active-clear').on('click', function() {

        $('.catalog__filters-min-input').val('0')

        $('.catalog__filters-max-input--one').val($('.catalog__filters-input--one').attr('data-max'))
        $('.catalog__filters-max-input--two').val($('.catalog__filters-input--two').attr('data-max'))

        instance.update({

          from: 0,
          to: $('.catalog__filters-input--one').attr('data-max')

        });

        instanceTwo.update({

          from: 0,
          to: $('.catalog__filters-input--two').attr('data-max')

        });

        $('.catalog__filters-item--one-line').removeClass('catalog__filters-item--active');
        $('.catalog__filters-item--two-line').removeClass('catalog__filters-item--active');

        if ($('.catalog__active-items li').length === 0) {

          $('.catalog__products-box').css('display', 'none');
    
        }

      });

    });

    $('.catalog__filters-min-input, .catalog__filters-max-input').on('input', function() {

      lineInput($(this));

    });

    $('.catalog__names-item').each(function() {

      if ($(this).find('.form-content__input-checkbox').prop('checked')) {

        $('.catalog__products-box').css('display', 'block');

        if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 > $('.catalog__active').outerWidth()) {

          $('.catalog__active-items').append(`<li class="catalog__active-item catalog__active-item--checkbox">${$(this).find('.form-content__text').text().trim()}<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`);


        }

        if ($('.catalog__products-content').outerWidth() - $('.catalog__first').outerWidth() - 30 < $('.catalog__active').outerWidth()) {

          $('.catalog__active-item:last-child').remove();

        }

      }

    });

    $('.catalog__filters-input').each(function() {

      lineChange($(this));

    });

    $('.catalog__active-item--checkbox').on('click', function() {

      const $this = $(this);

      $('.catalog__names-item').each(function() {

        if ($this.text().trim() === $(this).find('.form-content__text').text().trim()) {

          $(this).find('.form-content__input-checkbox').prop('checked', false);
          $this.remove();

        }

      });

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      }

    });

    $('.catalog__active-item--line-one').on('click', function() {;
      
      $('.catalog__filters-min-input--one').val($('.catalog__filters-input--one').attr('data-min'))
      $('.catalog__filters-max-input--one').val($('.catalog__filters-input--one').attr('data-max'))

      instance.update({

        from: $('.catalog__filters-input--one').attr('data-min'),
        to: $('.catalog__filters-input--one').attr('data-max')

      });

      $('.catalog__filters-item--one-line').removeClass('catalog__filters-item--active');

      $(this).remove();

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      }

    });

    $('.catalog__active-item--line-two').on('click', function() {;

      $('.catalog__filters-min-input--two').val($('.catalog__filters-input--two').attr('data-min'))
      $('.catalog__filters-max-input--two').val($('.catalog__filters-input--two').attr('data-max'))

      instanceTwo.update({

        from: $('.catalog__filters-input--two').attr('data-min'),
        to: $('.catalog__filters-input--two').attr('data-max')

      });

      $('.catalog__filters-item--two-line').removeClass('catalog__filters-item--active');

      $(this).remove();

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      }

    });

    $('.catalog__active-clear').on('click', function() {

      $('.form-content__input-checkbox').prop('checked', false);
      $('.catalog__active-item--checkbox').remove();

      $('.catalog__filters-min-input').val('0')

      $('.catalog__filters-max-input--one').val($('.catalog__filters-input--one').attr('data-max'))
      $('.catalog__filters-max-input--two').val($('.catalog__filters-input--two').attr('data-max'))

      instance.update({

        from: 0,
        to: $('.catalog__filters-input--one').attr('data-max')

      });

      instanceTwo.update({

        from: 0,
        to: $('.catalog__filters-input--two').attr('data-max')

      });

      $('.catalog__filters-item--one-line').removeClass('catalog__filters-item--active');
      $('.catalog__filters-item--two-line').removeClass('catalog__filters-item--active');

      $('.catalog__active-item--line-one').remove();
      $('.catalog__active-item--line-two').remove();

      if ($('.catalog__active-items li').length === 0) {

        $('.catalog__products-box').css('display', 'none');
  
      }

    });

  }

});