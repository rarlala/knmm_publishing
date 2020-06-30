$(function () {
  // left-menu-bar follow 버튼
  $('.left-menu-bar .follow').on('click', function () {
    $('.left-menu-bar .follow-container').fadeToggle('hidden');
    $('.left-menu-bar .follow').toggleClass('active');
  });

  // left-menu-bar site map

  $('.left-menu-bar .menu-btn').on('click', function () {
    $(this).addClass('on');
    $(this).parent().find('.site-map').css({
      transition: 'all 1s',
      display: 'block',
      opacity: 1,
    });
  });

  $('.left-menu-bar .site-map .btn-siteMapClose').on('click', function () {
    $('.left-menu-bar .menu-btn').removeClass('on');
    $('.left-menu-bar .site-map').css({
      display: 'none',
      opacity: 0,
    });
  });

  // right-menu-bar click 시 이동
  $('.right-menu-bar li').on('click',function() {
    var target = $(this).find('a').attr('href'),
      index = $(this).index();

    $('.right-menu-bar li').removeClass('active');
    $(this).addClass('active');

    if (index != 5) {
      scrollNum = index + 1;
    } else {
      scrollNum = 0;
    }

    $('html, body').stop(true).animate({
      scrollTop: $(target).offset().top
    }, 'slow', 'swing');
  })

  // tnb language

  $('.tnb .language').on('click', function() {
    $(this).css({
      'transition': 'all 2s'
    }).toggleClass('on');
  })

  // fade in fade out slide -> visual-slide 해당
  function fadeInSlide() {
    var slideLength = $('.visual-slide .slide-area ul li').length;
    var slideNext = 0;

    var timerId = '';
    var speed = 5000;

    timerId = setInterval(function() {
      slideRepeat();
    }, speed)

    function slideRepeat() {
      var slideNow = $('.visual-slide .slide-area ul li.on').index();
      slideNext = (slideNow + 1) < slideLength ? slideNow + 1 : 0;
      slide(slideNext);
    }

    $('.visual-slide .slide-tab ul li').on('click', function() {
      clearInterval(timerId);
      var index = $(this).index();
      slideNext = index + 1;
      slide(index);

      timerId = setInterval(function() {
        slideRepeat();
      }, speed)
    })

    function slide(n) {
      $('.visual-slide .slide-area ul li').removeClass('on');
      $(`.visual-slide .slide-area ul li:eq(${n})`).addClass('on');
      $('.visual-slide .slide-tab ul li').removeClass('on')
      $(`.visual-slide .slide-tab ul li:eq(${n})`).addClass('on');
    }
  }

  function ltrSlide(select) {
    $(select).find('.listNum li').on('click', function() {
        var index = $(this).index();
        slide(index);
      })

    function slide(n) {
      var leftValue = (n * -100) + '%';
      $(select).find('.content').css({
        'transition': 'all 2s',
        'left': `${leftValue}`,
      })

      $(select).find('.listNum li').removeClass('on');
      $(select).find(`.listNum li:eq(${n})`).addClass('on');
    }
  }

  fadeInSlide();
  ltrSlide($('.plan'));
  ltrSlide($('.online-edu'));
  ltrSlide($('.alert .popup'));

  //scroll에 따른 화면 이동
  var viewHeight = $(window).height(),
    footerHeight = $('footer').height(),
    scrollNum = 0,
    $nowScroll = 0;

  $(window).bind('mousewheel', function(event) {
    $nowScroll = $(window).scrollTop();

    if (event.originalEvent.wheelDelta >= 0) {
      if (scrollNum > 5) {
        scrollNum -= 1;
        $('html, body').stop(true).animate({
          scrollTop: ($nowScroll - footerHeight)
        }, 1000);
      } else if (scrollNum > 0) {
        scrollNum -= 1;
        $('html, body').stop(true).animate({
          scrollTop: ($nowScroll - viewHeight)
        }, 1000);
      }
    } else {
      if (scrollNum < 5) {
        scrollNum += 1;
        $('html, body').stop(true).animate({
          scrollTop: ($nowScroll + viewHeight)
        }, 1000);
      } else if (scrollNum < 6) {
        scrollNum += 1;
        $('html, body').stop(true).animate({
          scrollTop: ($nowScroll + footerHeight)
        }, 1000);
      }
    }

    //scroll에 따른 header 색상 변경
    if (scrollNum >= 5 || scrollNum === 0) {
      $('header').removeClass('active');
      $('.left-menu-bar').removeClass('active');
      $('.right-menu-bar').removeClass('active');

      if (scrollNum === 6) {
        $('header').css({
          'background': 'rgba(0,0,0,0.5)'
        });
      } else {
        $('header').css({
          'background': 'transparent'
        });
      }
    } else if (scrollNum > 0) {
      $('header').addClass('active');
      $('.left-menu-bar').addClass('active');
      $('.right-menu-bar').addClass('active');
    }
  });
})