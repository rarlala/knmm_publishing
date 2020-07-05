$(function() {
  preventDefaultAnchor();

  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function(e) {
      e.preventDefault();
      $('a:hover').css({
        cursor: 'pointer'
      });
    });
  }

  // tnb language
  $('.tnb .language').on('click', function() {
    $(this)
      .css({
        transition: 'all 2s',
      })
      .toggleClass('on');
  });

  // left-menu-bar follow 버튼
  $('.left-menu-bar .follow').on('click', function() {
    $('.left-menu-bar .follow-container').fadeToggle('hidden');
    $('.left-menu-bar .follow').toggleClass('active');
  });

  // left-menu-bar site map
  $('.left-menu-bar .menu-btn').on('click focus', function() {
    $(this).addClass('on');
    $(this).parent().find('.site-map').css({
      transition: 'all 1s',
      display: 'block',
      opacity: 1,
    });
  });

  $('.left-menu-bar .site-map .btn-siteMapClose').on('click', function() {
    $('.left-menu-bar .menu-btn').removeClass('on');
    $('.left-menu-bar .site-map').css({
      display: 'none',
      opacity: 0,
    });
  });
});