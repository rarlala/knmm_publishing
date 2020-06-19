$(function() {

  var viewHeight = $(window).height(),
    footerHeight = $('footer').height(),
    scrollNum = 0;

  // left-menu-bar follow 버튼
  $('.left-menu-bar .follow').click(function() {
    $('.left-menu-bar .follow-container').fadeToggle('hidden');
    $('.left-menu-bar .follow').toggleClass('active');
  })

  // right-menu-bar click 시 이동
  $('.right-menu-bar li').click(function() {
    var target = $(this).find('a').attr('href'),
      index = $(this).index();

    if (index != 5) {
      scrollNum = index + 1;
    } else {
      scrollNum = 0;
    }

    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 'slow', 'swing');
  })


  //scroll에 따른 화면 이동

  // $(window).bind('mousewheel', function(event) {
  //   var $nowScroll = $(window).scrollTop();

  //   if (event.originalEvent.wheelDelta >= 0) {
  //     if (scrollNum > 5) {
  //       scrollNum -= 1;
  //       $('html, body').animate({
  //         scrollTop: ($nowScroll - footerHeight)
  //       }, 1000);
  //     } else if (scrollNum > 0) {
  //       scrollNum -= 1;
  //       $('html, body').animate({
  //         scrollTop: ($nowScroll - viewHeight)
  //       }, 1000);
  //     }
  //   } else {
  //     if (scrollNum < 5) {
  //       scrollNum += 1;
  //       $('html, body').animate({
  //         scrollTop: ($nowScroll + viewHeight)
  //       }, 1000);
  //     } else if (scrollNum < 6) {
  //       scrollNum += 1;
  //       $('html, body').animate({
  //         scrollTop: ($nowScroll + footerHeight)
  //       }, 1000);

  //     }
  //     console.log(scrollNum);
  //   }

  //   //scroll에 따른 header 색상 변경
  //   if (scrollNum >= 5 || scrollNum === 0) {
  //     $('header').removeClass('active');
  //     $('.left-menu-bar').removeClass('active');
  //     $('.right-menu-bar').removeClass('active');

  //     if (scrollNum === 6) {
  //       $('header').css({
  //         'background': 'rgba(0,0,0,0.5)'
  //       });
  //     } else {
  //       $('header').css({
  //         'background': 'transparent'
  //       });
  //     }
  //   } else if (scrollNum > 0) {
  //     $('header').addClass('active');
  //     $('.left-menu-bar').addClass('active');
  //     $('.right-menu-bar').addClass('active');
  //   }
  // });


})