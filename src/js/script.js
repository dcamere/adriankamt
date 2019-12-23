/* jQuery anchor link */
$(function () {
	$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  var stickySidebar = $('.header').offset().top;
  
  $(window).scroll(function() {  
      if ($(window).scrollTop() > stickySidebar) {
        $('.header').addClass('affix');
      }
      else {
        $('.header').removeClass('affix');
      }

      var scrollPos = $(document).scrollTop();
      $('.header a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.header ul li a').closest('li').removeClass("active");
              currLink.closest('li').addClass("active");
          }
          else{
              currLink.closest('li').removeClass("active");
          }
      });

      if (elementInViewport(document.querySelector('#contacto'))) {
        $('.contacto').addClass('active');
        $('.contacto').siblings().removeClass('active');
      }
  });


  $('.section-main__accordion__click').on('click', function () {
    $('.section-main__accordion').toggleClass('active');
    setTimeout(function () {
      stickySidebar = $('.header').offset().top;
    }, 250);
  });
});

/* Check for device type */
var detectDeviceType = function detectDeviceType() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
	);
};

/* Check if element is visible */
var elementIsVisibleInViewport = function elementIsVisibleInViewport(el) {
	var partiallyVisible = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	var _el$getBoundingClient = el.getBoundingClientRect();
	
	var top = _el$getBoundingClient.top;
	var left = _el$getBoundingClient.left;
	var bottom = _el$getBoundingClient.bottom;
	var right = _el$getBoundingClient.right;
	var _window = window;
	var innerHeight = _window.innerHeight;
	var innerWidth = _window.innerWidth;
	
	return partiallyVisible ? (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

/* Example of GSAP Timeline lite */
$(document).ready(function () {
	var tl = new TimelineLite();
	var htmlAndBody = $('html, body');
	tl.to(htmlAndBody, .1, {overflowY: "hidden"});
	tl.staggerFrom($('.animate'), .7, {y: -200, autoAlpha: 0}, 0.3);
	tl.staggerFrom($('.including'), .3, {x: -400, autoAlpha: 0});
	tl.staggerFrom($('.avatar'), 0.6, {scale: 0, autoAlpha: 0,  ease: Sine.easeOut});
	tl.staggerFromTo($('.row.second div'), .5, {y: 400, autoAlpha: 0}, {y:0, autoAlpha: 1}, 0.3);
	tl.to(htmlAndBody, .1, {overflowY: "auto"});
});