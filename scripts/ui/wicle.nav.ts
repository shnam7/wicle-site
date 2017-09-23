/**
 *  Wicle scripts
 *
 *  @module Nav
 *
 */

namespace Wicle {
  export function nav(selector:string, options:object={}) {
    let defaultOptions = {
      speed: 200,
      showDelay: 0,
      hideDelay: 0,
      parentLink: false,
      singleOpen: true,
    };
    let opts = $.extend({}, defaultOptions, options);

    let $nav = $(selector);

    // set basic classes
    $nav.addClass('w-nav')
      .find('li').addClass('w-nav-item')
      .children('a,div').addClass('w-nav-item-wrapper');

    // set parent/child settings for multi-level menus
    $nav.filter('.wo-dropdown,.wo-accordion')
      .find('ul').addClass('w-nav-child') // set parent/child classes, add parent marker
      .parent().addClass('w-nav-parent')
      .children('.w-nav-item-wrapper').append('<span class="w-nav-parent-marker">');


    //--- dropdown settings
    let $dropdown = $nav.filter('.wo-dropdown');

    // check divider items
    $dropdown.find('.w-nav-item').each(function (index, el) {
        let $el = $(el);
        if (!/[^\-\u2014\u2013\s]/.test($el.text())) $el.addClass('w-nav-divider');
      })

    // check out-of-viewport status
    $dropdown.find('.w-nav-parent').mouseenter(function () {
        let $sub = $(this).children('.w-nav-child');
        // check element position if it exceeds viewport
        // ref: http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
        // ref: http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport
        // ref: http://stackoverflow.com/questions/36175336/get-element-position-relative-to-top-of-the-viewport
        let rect = $sub.get(0).getBoundingClientRect();
        let flip = undefined;
        // window.innerWidth includes scrollbars. so, use document.body.clientWidth for horizontal check
        if (rect.right >= document.body.clientWidth) flip = 'x';
        if (rect.bottom >= window.innerHeight) flip += 'y';
        if (flip) $sub.attr('aria-flip', flip);
      });


    //-- accordion settings
    let $accordion = $nav.filter('.wo-accordion');
    // add accordion click area to avoid link activation
    $accordion.find('.w-nav-item-wrapper').after($('<span class="w-nav-accordion-click-area"></span>'));

    // set click handler
    $accordion.find('.w-nav-parent,.w-nav-accordion-click-area').click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      let href = $(this).children('a').attr('href');

      // set $this to be w-nav-item(li) regardless of clicked element
      let $this = $(this);
      if ($this.is('.w-nav-accordion-click-area')) $this = $(this).parent();

      let $sub = $this.children('.w-nav-child');
      let $subAll = $this.find('.w-nav-child');
      if ($sub.length > 0) {
        if ($sub.css("display") === "none") {
          $sub.slideDown(opts.speed).siblings("a").addClass('w-state-active');
          if (opts.singleOpen) {
            $this.siblings().find('.w-nav-child').slideUp(opts.speed)
              .end().find("a").removeClass('w-state-active');
          }
        }
        else {
          $subAll.delay(opts.hideDelay).slideUp(opts.speed)
            .siblings('a').removeClass('w-state-active');
        }
      }
      if (opts.parentLink && href) window.location.href = href;
    });

    // reset out-of-viewport stats on resize
    $(window).resize((e) => {
      $nav.find('[aria-flip]').removeAttr('aria-flip');
    });
  }
}
