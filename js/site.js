$(document).on('ready', function() {
  $('.form--search__reveal').on('click', function() {
    $('.form--search').addClass('is-visible');
    $(this).addClass('is-hidden');
  });

  setRailHeight();
});

// On document load or resize, resize the rail's height.
$(window).on('load', function() {
  setRailHeight();
});

$(window).on('resize', function() {
  setRailHeight();
});

function setRailHeight() {
  if ($(window).width() > 960) {
    var $mainColumn = $('.l-container').find('.card').last();
    var $railColumn = $('.l-overview');

    var mainBottom = $mainColumn.outerHeight() + $mainColumn.offset().top;
    var railBottom = $railColumn.outerHeight() + $railColumn.offset().top;

    var railHeight = $railColumn.height();

    $railColumn.height((mainBottom - railBottom) + railHeight);
  } else {
    $('.l-overview').removeAttr('style');
  }
}
