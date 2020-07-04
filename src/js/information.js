$(function() {

  // page-nav 기능 구현
  $('.page-nav .inner > ul > li')
    .on('mouseenter', function() {
      if ($(this).find('ul').length) {
        $('.page-nav').addClass('on');
      }
      $(this).addClass('on');
    })
    .on('mouseleave ', function() {
      $('.page-nav').removeClass('on');
      $('.page-nav .inner > ul > li').removeClass('on');
    })

  // scroll event 구현 : page-nav scroll 시 화면 상단에 고정 및 top으로 이동 버튼
  checkScroll();

  function checkScroll() {
    var scrollTop = 0;
    var pageNavScroll = $('.page-nav').offset().top;
    var $btnTop = $('footer .btn-top');

    $(window).on('scroll', function() {
      scrollTop = $(document).scrollTop();

      if (pageNavScroll <= scrollTop) {
        $('.page-nav').addClass('fixed');
      } else {
        $('.page-nav').removeClass('fixed');
      }

      if (scrollTop >= 180) {
        $btnTop.addClass('show');
      } else {
        $btnTop.removeClass('show');
      }
    })

    $btnTop.on('click', function() {
      $('html').stop('true').animate({
        scrollTop: 0,
      }, 500);
    });
  }

  // move tab
  tabUI($('.move .tab-list li'));

  function tabUI(selector) {
    selector.on('click', function() {
      var clickTabNum = selector.index(this);
      selector.removeClass('on');
      $(this).addClass('on');
      $('.move .img-list li').removeClass('on');
      $('.move .img-list li').eq(clickTabNum).addClass('on');
    });
  }
});