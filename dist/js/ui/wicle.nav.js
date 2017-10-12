/**
 *  Wicle scripts
 *
 *  @module Nav
 *
 */
///<reference path="../core/wicle.core.ts"/>
var Wicle;
(function (Wicle) {
    var Nav = /** @class */ (function () {
        function Nav(el, options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            // reset out-of-viewport status on window resize
            this.flipHandler = function (e) {
                $('.w-nav').find('[aria-flip]').removeAttr('aria-flip');
            };
            // detect and respond to media query changes
            this.mqChangeHandler = function (e) {
                var width = e.detail.width;
                var prevWidth = e.detail.prevWidth;
                var breakPoint = _this.options.breakPoint;
                if (_this.classes.indexOf('wo-responsive') < 0)
                    return;
                console.debug('mqChanged:', e.detail);
                if (width >= breakPoint && prevWidth < breakPoint) {
                    console.log('state=', e.state, 'chanjge to normal');
                    if (_this.options.mqChangeToNormal)
                        _this.options.mqChangeToNormal(_this, e);
                    // $(this.element).attr('class', this.classes);
                }
                if (width < breakPoint && prevWidth >= breakPoint) {
                    console.log('state=', e.state, 'change to mobile');
                    if (_this.options.mqChangeToMobile)
                        _this.options.mqChangeToMobile(_this, e);
                    // $(this.element).attr('class', 'wz-nav w-nav wo-accordion').show();
                }
            };
            // accordion click event handler
            this.accordionClickEventHandler = function (e) {
                e.stopPropagation();
                e.preventDefault();
                var opts = _this.options;
                var $target = $(e.target);
                var href = $target.attr('href');
                // set target to w-nav-parent
                $target = $target.parent();
                var $sub = $target.children('.w-nav-child');
                var $subAll = $target.find('.w-nav-child');
                if ($sub.length > 0) {
                    if ($sub.css("display") === "none") {
                        $sub.slideDown(opts.speed).siblings("a").addClass('aria-state-active');
                        if (opts.singleOpen) {
                            $target.siblings().find('.w-nav-child').slideUp(opts.speed)
                                .end().find("a").removeClass('aria-state-active');
                        }
                    }
                    else {
                        $subAll.delay(opts.hideDelay).slideUp(opts.speed)
                            .siblings('a').removeClass('aria-state-active');
                    }
                }
                if (opts.parentLink && href)
                    window.location.href = href;
            };
            this.element = el;
            this.options = $.extend(true, {}, Nav.defaultOptions, options);
            this.create();
        }
        Nav.prototype.create = function () {
            var $nav = $(this.element);
            $.data(this.element, 'w-nav', this);
            this.classes = $nav.attr('class');
            // set basic classes
            $nav.addClass('w-nav')
                .find('li').addClass('w-nav-item')
                .children('a,div').addClass('w-nav-item-wrapper');
            // set parent/child settings for multi-level menus
            $nav.filter('.wo-dropdown,.wo-default,.wo-accordion')
                .find('ul').addClass('w-nav-child') // set parent/child classes, add parent marker
                .parent().addClass('w-nav-parent');
            $nav.filter(':not(.wo-icon)').find('.w-nav-parent')
                .children('.w-nav-item-wrapper').each(function (idx, el) {
                var $el = $(el);
                if ($el.children('.w-nav-parent-marker').length === 0)
                    $el.append('<span class="w-nav-parent-marker">');
            });
            //--- dropdown settings
            var $dropdown = $nav.filter('.wo-dropdown, .wo-default');
            // check divider items: item text only with '-' or unicode dashes or spaces
            $dropdown.find('.w-nav-item').each(function (index, el) {
                var $el = $(el);
                // if (!/[^\-\u2014\u2013\s]/.test($el.text())) $el.addClass('w-nav-divider');
                // text should starts with one or more dashes
                if (/^[\-\u2014\u2013]+/.test($el.text()))
                    $el.addClass('w-nav-divider');
            });
            // check out-of-viewport status
            $dropdown.find('.w-nav-parent')
                .off('mouseenter').on('mouseenter', function () {
                var $sub = $(this).children('.w-nav-child');
                // check element position if it exceeds viewport
                // ref: http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
                // ref: http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport
                // ref: http://stackoverflow.com/questions/36175336/get-element-position-relative-to-top-of-the-viewport
                var rect = $sub.get(0).getBoundingClientRect();
                var flip = undefined;
                // window.innerWidth includes scrollbars. so, use document.body.clientWidth for horizontal check
                if (rect.right >= document.body.clientWidth)
                    flip = 'x';
                if (rect.bottom >= window.innerHeight)
                    flip += 'y';
                if (flip)
                    $sub.attr('aria-flip', flip);
            });
            // accordion settings
            var $accordion = $nav.filter('.wo-accordion');
            // add accordion click area to avoid link activation
            $accordion.find('.w-nav-item-wrapper').each(function (idx, el) {
                var $el = $(el);
                if ($el.children('.w-nav-accordion-click-area').length === 0)
                    $el.after($('<span class="w-nav-accordion-click-area"></span>'));
            });
            // check manually activated items
            $nav.find('.w-state-active').addClass('aria-state-active');
            // set event handlers
            $accordion.find('.w-nav-item-wrapper,.w-nav-accordion-click-area')
                .off('click', this.accordionClickEventHandler)
                .on('click', this.accordionClickEventHandler);
            $(window).off('resize', this.flipHandler).on('resize', this.flipHandler);
            if (this.options.mqChangeToNormal || this.options.mqChangeToMobile) {
                window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
                window.addEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            }
        };
        Nav.prototype.destroy = function () {
            var $nav = $(this.element);
            // remove dynamic elements
            $nav.find(Nav.dynamicElements).remove();
            // remove dynamic classes
            $nav.find(Nav.dynamicClasses).removeClass(Nav.dynamicClasses);
            // remove event handlers
            $(window).off('resize', this.flipHandler);
            window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            $nav.filter('.wo-accordion').find('.w-nav-parent,.w-nav-accordion-click-area').off('click');
            // remove nav object
            $.removeData(this.element, 'w-nav');
        };
        Nav.defaultOptions = {
            speed: 200,
            showDelay: 0,
            hideDelay: 0,
            parentLink: false,
            singleOpen: false,
            breakPoint: 640,
            mqChangeToMobile: null,
            mqChangeToNormal: null,
        };
        Nav.dynamicClasses = 'w-nav,w-nav-item,w-nav-item-wrapper'
            + 'w-nav-parent,w-nav-child,w-nav-divider'
            + 'aria-flip, aria-state-active';
        Nav.dynamicElements = 'w-nav-parent-marker,w-nav-accordion-click-area';
        Nav.mqStateChangedEventName = 'mqstatechanged';
        return Nav;
    }());
    Wicle.Nav = Nav;
    function nav(selector, options) {
        if (options === void 0) { options = {}; }
        $(selector).each(function (idx, el) {
            new Nav(el, options);
        });
    }
    Wicle.nav = nav;
})(Wicle || (Wicle = {}));
