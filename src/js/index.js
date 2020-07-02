$(function () {
  preventDefaultAnchor();

  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
      $('a:hover').css({ cursor: 'pointer' });
    });
  }

  // parallex
  setParallex('.scroll-page');

  function setParallex(selector) {
    var numPage = $(selector).length;
    var pageNow = 0;
    var pagePrev = 0;
    var pageNext = 0;
    var eventScroll = 'onmousewheel' in window ? 'mousewheel' : 'DOMMouseScroll';
    var onAnimation = false;
    var footerScroll = false;

    $('#page-indicator li a').on('click', function () {
      var index = $('#page-indicator li').index($(this).parent());
      showPage(index + 1);
    });

    $('.btn-scroll-down').on('click', function () {
      showPage(pageNext);
    });

    checkScroll();
    window.addEventListener(
      eventScroll,
      function (e) {
        e.preventDefault();
        if (onAnimation === true) return false;
        onAnimation = true;
        var delta = 0;
        if (eventScroll === 'mousewheel') {
          delta = e.wheelDelta / -120;
        } else {
          delta = e.detail / 3;
        }

        if (delta > 0) {
          if (pageNow === 6) {
            footerScroll = true;
          }
          showPage(pageNext);
        } else if (delta < 0) {
          if (pageNow === 6 && footerScroll !== false) {
            pagePrev = 6;
            showPage(pagePrev);
            footerScroll = false;
          } else {
            showPage(pagePrev);
          }
        }
      },
      {
        passive: false,
      }
    );

    $(window).on('scroll resize', function () {
      checkScroll();
    });

    function checkScroll() {
      var scrollTop = $(document).scrollTop();

      $(selector).each(function (i) {
        var minScroll = $(this).offset().top - $(window).height() / 2;
        var maxScroll = $(this).offset().top + $(window).height() / 2;
        if (scrollTop > minScroll && scrollTop <= maxScroll) {
          var n = i + 1;

          $(selector).removeClass('show');
          $(selector)
            .eq(n - 1)
            .addClass('show');
          $('#page-indicator li').removeClass('active');
          if (n === 1) {
            $('#page-indicator li').eq(5).addClass('active');
          } else {
            $('#page-indicator li')
              .eq(n - 2)
              .addClass('active');
          }

          pageNow = n;
          pagePrev = n - 1 < 1 ? 1 : n - 1;
          pageNext = n + 1 >= numPage + 1 ? numPage + 1 : n + 1;

          $('header').css({
            background: 'transparent',
          });

          if (n === 1 || n === 6) {
            $('header').removeClass('active');
            $('.left-menu-bar').removeClass('active');
            $('#page-indicator').removeClass('black');
          } else {
            $('header').addClass('active');
            $('.left-menu-bar').addClass('active');
            $('#page-indicator').addClass('black');
          }
        }
      });
    }

    function showPage(n) {
      if (n <= numPage) {
        var scrollAmt = $(selector + ':eq(' + (n - 1) + ')').offset().top;
        $('html, body')
          .stop(true)
          .animate(
            {
              scrollTop: scrollAmt + 'px',
            },
            500,
            function () {
              onAnimation = false;
            }
          );
      } else {
        var scrollAmt = $(selector + ':eq(' + (numPage - 1) + ')').offset().top;
        var footerHeight = $('footer').height();

        $('html, body')
          .stop(true)
          .animate(
            {
              scrollTop: scrollAmt + footerHeight + 'px',
            },
            500,
            function () {
              onAnimation = false;
            }
          );
      }
    }
  }

  // tnb language
  $('.tnb .language').on('click', function () {
    $(this)
      .css({
        transition: 'all 2s',
      })
      .toggleClass('on');
  });

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

  // page-indicator click 시 이동
  $('#page-indicator li').on('click', function () {
    var target = $(this).find('a').attr('href'),
      index = $(this).index();

    $('#page-indicator li').removeClass('active');
    $(this).addClass('active');

    if (index != 5) {
      scrollNum = index + 1;
    } else {
      scrollNum = 0;
    }

    $('html, body')
      .stop(true)
      .animate(
        {
          scrollTop: $(target).offset().top,
        },
        'slow',
        'swing'
      );
  });

  // fade in fade out slide -> visual-slide 해당
  fadeInSlide();

  function fadeInSlide() {
    var slideLength = $('.visual-slide .slide-area ul li').length;
    var slideNext = 0;

    var timerId = '';
    var speed = 5000;

    timerId = setInterval(function () {
      slideRepeat();
    }, speed);

    function slideRepeat() {
      var slideNow = $('.visual-slide .slide-area ul li.on').index();
      slideNext = slideNow + 1 < slideLength ? slideNow + 1 : 0;
      slide(slideNext);
    }

    $('.visual-slide .slide-tab ul li').on('click', function () {
      clearInterval(timerId);
      var index = $(this).index();
      slideNext = index + 1;
      slide(index);

      timerId = setInterval(function () {
        slideRepeat();
      }, speed);
    });

    function slide(n) {
      $('.visual-slide .slide-area ul li').removeClass('on');
      $(`.visual-slide .slide-area ul li:eq(${n})`).addClass('on');
      $('.visual-slide .slide-tab ul li').removeClass('on');
      $(`.visual-slide .slide-tab ul li:eq(${n})`).addClass('on');
    }
  }

  // left to right slide -> plan, online-edu 해당
  ltrSlide($('.plan'));
  ltrSlide($('.online-edu'));

  function ltrSlide(select) {
    $(select)
      .find('.listNum li')
      .on('click', function () {
        var index = $(this).index();
        slide(index);
      });

    function slide(n) {
      var leftValue = n * -100 + '%';
      $(select)
        .find('.content')
        .css({
          transition: 'all 2s',
          left: `${leftValue}`,
        });

      $(select).find('.listNum li').removeClass('on');
      $(select).find(`.listNum li:eq(${n})`).addClass('on');
    }
  }

  // swipe slide -> popup 해당
  swipeSlide($('.popup .img-slide .box .slide li'));

  function swipeSlide(liSelector) {
    var slideNum = liSelector.length;
    var width = slideNum * 100;

    $('.popup .img-slide .box ul li').each(function (i) {
      $('.popup .indicator').append(`<li class=${i + 1}></li>`);
      $('.popup .indicator li.1').addClass('on');
    });

    $('.popup .img-slide .box .slide').css({
      width: `${width}%`,
    });

    $('.popup .indicator li').on('click', function () {
      $('.popup .indicator li').removeClass('on');
      $(this).addClass('on');
      var index = $('.popup .indicator li').index(this);
      var move = index * -100;
      $('.popup .img-slide .box .slide').css({
        left: `${move}%`,
      });
    });
  }

  // alert board tab

  tabUI($('.board .tab-title'));
  function tabUI(selector) {
    selector.on('click', function () {
      selector.parent().removeClass('on');
      $(this).parent().addClass('on');
    });
  }
});
