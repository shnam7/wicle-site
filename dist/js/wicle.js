/**
 *  Wicle Core
 */
var Wicle;
(function (Wicle) {
    Wicle.$ = jQuery;
    var defaultOptions = {};
    Wicle.options = defaultOptions;
    function init(options) {
        if (options === void 0) { options = {}; }
        Wicle.options = Wicle.$.extend(true, {}, defaultOptions, options);
    }
    Wicle.init = init;
    // ref: https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
    function getViewporSize() {
        var e = window;
        var a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    }
    Wicle.getViewporSize = getViewporSize;
})(Wicle || (Wicle = {}));
// get element offset and outer size
// getElementPosize(element) {
//     let $element = $(element), ret={}, tmpCSS=null, $tmpEl=null;
//     if (!$element.is(":visible")) {
//         tmpCSS = {
//             position: $element.css("position"),
//             visibility: $element.css("visibility"),
//             display: $element.css("display")
//         };
//         $element.css({position: 'absolute', visibility: 'hidden', display: 'block'});
//     }
//     let offset = $element.offset();
//     ret = { left:offset.left, top:offset.top,
//         width:$element.outerWidth(), height:$element.outerHeight() };
//     if (tmpCSS) $element.css(tmpCSS); // reset element
//     return ret;
// }
/**
 *  Wicle MediaQuery
 */
var Wicle;
(function (Wicle) {
    var MediaQuery = /** @class */ (function () {
        function MediaQuery(breakPoints, options) {
            if (breakPoints === void 0) { breakPoints = MediaQuery.BreakPoints.Foundation; }
            if (options === void 0) { options = {}; }
            this.init(breakPoints, options);
            this.startMediaChangeDetection();
        }
        MediaQuery.prototype.init = function (breakPoints, options) {
            if (options === void 0) { options = {}; }
            this.breakPoints = Wicle.$.extend({}, breakPoints);
            this.options = Wicle.$.extend(true, {}, MediaQuery.defaultOptions, options);
            this.prevWidth = Wicle.getViewporSize().width;
            this.prevState = this.getMQState(this.prevWidth);
        };
        // check window resize is crossing media query breakpoints
        MediaQuery.prototype.startMediaChangeDetection = function () {
            var _this = this;
            var timer = 0;
            var resizeHandler = function (e) {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(function () {
                    var width = Wicle.getViewporSize().width;
                    var state = _this.mqStateOf(width);
                    if (state != _this.prevState) {
                        console.debug('resize:', "MQ:width=" + width + ", state=" + state + ", prevState=" + _this.prevState);
                        window.dispatchEvent(new CustomEvent(MediaQuery.mqStateChangedEventName, { 'detail': {
                                state: state,
                                prevState: _this.prevState,
                                breakPoints: _this.breakPoints,
                                width: width,
                                prevWidth: _this.prevWidth,
                                direction: width > _this.prevWidth ? 'up' : 'down'
                            } }));
                        _this.prevWidth = width;
                        _this.prevState = state;
                    }
                });
                e.stopPropagation();
            };
            Wicle.$(window).off('resize', resizeHandler).on('resize', resizeHandler);
        };
        ;
        /**
         *  Convert width to Media Query name
         *  @param width
         *  @returns {MQState}
         */
        MediaQuery.prototype.mqStateOf = function (width) {
            var key;
            for (key in this.breakPoints) {
                if (this.breakPoints.hasOwnProperty(key)) {
                    if (width < this.breakPoints[key])
                        return key;
                }
            }
            return key;
        };
        MediaQuery.prototype.getMQState = function (width) {
            if (width === void 0) { width = null; }
            if (!width)
                width = Wicle.getViewporSize().width;
            return this.mqStateOf(width);
        };
        MediaQuery.defaultOptions = {
            //   breakPoints: {mini: 480, small: 768, medium: 960, large: 1220},
            resizeEventDelay: 100,
        };
        // pre-defined breakpoints
        MediaQuery.BreakPoints = {
            // screen based states (foundation-site compatible)
            Foundation: {
                mini: 0,
                small: 320,
                medium: 640,
                large: 1024,
                xlarge: 1200,
                xxlarge: 1440
            },
            // device based states (semantic-ui compatible)
            SemanticUI: {
                mini: 0,
                phone: 320,
                tablet: 768,
                computer: 992,
                largeMonitor: 1200,
                wideMonitor: 1920
            },
            // generic states (UIKit compatible)
            UIKit: {
                mini: 0,
                small: 480,
                medium: 768,
                large: 960,
                xlarge: 1220
            },
            // generic states (Bootstrap compatible)
            BootStrap: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
            },
            Simple: {
                mobile: 0,
                computer: 960,
            },
            Basic: {
                small: 0,
                medium: 768,
                large: 960
            }
        };
        MediaQuery.mqStateChangedEventName = 'mqstatechanged';
        return MediaQuery;
    }());
    Wicle.MediaQuery = MediaQuery;
    Wicle.mediaQuery = new MediaQuery();
})(Wicle || (Wicle = {}));
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
                Wicle.$('.w-nav').find('[aria-flip]').removeAttr('aria-flip');
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
                var $target = Wicle.$(e.target);
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
            this.options = Wicle.$.extend(true, {}, Nav.defaultOptions, options);
            this.create();
        }
        Nav.prototype.create = function () {
            var $nav = Wicle.$(this.element);
            Wicle.$.data(this.element, 'w-nav', this);
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
                var $el = Wicle.$(el);
                if ($el.children('.w-nav-parent-marker').length === 0)
                    $el.append('<span class="w-nav-parent-marker">');
            });
            //--- dropdown settings
            var $dropdown = $nav.filter('.wo-dropdown, .wo-default');
            // check divider items: item text only with '-' or unicode dashes or spaces
            $dropdown.find('.w-nav-item').each(function (index, el) {
                var $el = Wicle.$(el);
                // if (!/[^\-\u2014\u2013\s]/.test($el.text())) $el.addClass('w-nav-divider');
                // text should starts with one or more dashes
                if (/^[\-\u2014\u2013]+/.test($el.text()))
                    $el.addClass('w-nav-divider');
            });
            // check out-of-viewport status
            $dropdown.find('.w-nav-parent')
                .off('mouseenter').on('mouseenter', function () {
                var $sub = Wicle.$(this).children('.w-nav-child');
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
                var $el = Wicle.$(el);
                if ($el.children('.w-nav-accordion-click-area').length === 0)
                    $el.after(Wicle.$('<span class="w-nav-accordion-click-area"></span>'));
            });
            // check manually activated items
            $nav.find('.w-state-active').addClass('aria-state-active');
            // set event handlers
            $accordion.find('.w-nav-item-wrapper,.w-nav-accordion-click-area')
                .off('click', this.accordionClickEventHandler)
                .on('click', this.accordionClickEventHandler);
            Wicle.$(window).off('resize', this.flipHandler).on('resize', this.flipHandler);
            if (this.options.mqChangeToNormal || this.options.mqChangeToMobile) {
                window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
                window.addEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            }
        };
        Nav.prototype.destroy = function () {
            var $nav = Wicle.$(this.element);
            // remove dynamic elements
            $nav.find(Nav.dynamicElements).remove();
            // remove dynamic classes
            $nav.find(Nav.dynamicClasses).removeClass(Nav.dynamicClasses);
            // remove event handlers
            Wicle.$(window).off('resize', this.flipHandler);
            window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            $nav.filter('.wo-accordion').find('.w-nav-parent,.w-nav-accordion-click-area').off('click');
            // remove nav object
            Wicle.$.removeData(this.element, 'w-nav');
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
        Wicle.$(selector).each(function (idx, el) {
            new Nav(el, options);
        });
    }
    Wicle.nav = nav;
})(Wicle || (Wicle = {}));
///<reference types="jquery"/>
var Wicle;
(function (Wicle) {
    var Parallax;
    (function (Parallax) {
        var Container = /** @class */ (function () {
            /**
             *   Creates a Container for a Parallax
             *
             *   @param {HTMLElement} scrollableContent The container that will be parallaxed
             *   @param {perspective} perspective The ratio of how much back content should be scrolled
             *          relative to forward content. For example, if this value is 0.5, and there are 2 surfaces,
             *          the front-most surface would be scrolled normally, and the surface behind it would be scrolled
             *          half as much.
             */
            function Container(scrollableContent, perspective) {
                var _this = this;
                this.content = scrollableContent;
                this.surface = [];
                this.perspective = perspective;
                this.lastPerspective = 1; // perspective of lowest surface
                Wicle.$(scrollableContent).scroll(function (event) {
                    _this.onContainerScroll(event);
                });
            }
            Container.prototype.onContainerScroll = function (e) {
                var currentScrollPos = Wicle.$(this.content).scrollTop();
                for (var _i = 0, _a = this.surface; _i < _a.length; _i++) {
                    var surface = _a[_i];
                    surface.scroll(-currentScrollPos);
                }
            };
            Container.prototype.addSurface = function (surface) {
                if (this.surface.length == 0) { // if first surface
                    if (surface.perspective <= 0)
                        surface.perspective = 1;
                }
                else {
                    if (surface.perspective <= 0)
                        surface.perspective = this.perspective;
                    surface.perspective *= this.lastPerspective;
                }
                this.lastPerspective = surface.perspective;
                this.surface.push(surface);
                // console.log(surface, 'perspective=', surface.perspective);
            };
            return Container;
        }());
        Parallax.Container = Container;
        var Surface = /** @class */ (function () {
            function Surface(surfaceContents, perspective) {
                if (perspective === void 0) { perspective = 0; }
                this.perspective = perspective;
                this.content = surfaceContents;
                Wicle.$(surfaceContents).css({
                    position: 'fixed',
                    transform: 'translate3d(0, 0, 0)'
                });
            }
            Surface.prototype.scroll = function (scrollPos) {
                Wicle.$(this.content).css({
                    transform: "translate3d(0, " + scrollPos * this.perspective + "px, 0)"
                });
            };
            return Surface;
        }());
        Parallax.Surface = Surface;
    })(Parallax = Wicle.Parallax || (Wicle.Parallax = {}));
})(Wicle || (Wicle = {}));
/**
 *  Wicle
 *
 *  @module Javascript String extension
 *
 */
/**
 * Trim specified characters on the left side
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimLeft = function (charList) {
    if (charList === undefined)
        charList = '\\s';
    return this.replace(new RegExp("^[" + charList + "]+"), "").toString();
};
/**
 * Trim specified characters on the right side
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimRight = function (charList) {
    if (charList === undefined)
        charList = '\\s';
    return this.replace(new RegExp("[" + charList + "]+$"), "").toString();
};
/**
 * Trim specified characters on both sides
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimBoth = function (charList) {
    return this.trimLeft(charList).trimRight(charList);
};
/**
 * Trim specified characters in whole string
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimAll = function (charList) {
    if (charList === undefined)
        charList = '\\s';
    return this.replace(new RegExp("[" + charList + "]+", 'g'), "");
};
String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
};
String.prototype.endsWith = function (str) {
    return this.slice(-str.length) == str;
};
String.prototype.parseOptions = function (separator) {
    if (separator === void 0) { separator = ";"; }
    var str = this.trimBoth('{}' + separator).trim();
    var opts = {};
    str.split(separator).forEach(function (item) {
        var pos = item.indexOf(':');
        var key = item.substring(0, pos).trim();
        var val = item.substring(pos + 1).trim();
        var toValue = function (val) {
            if (!val)
                return null;
            if (val === 'true')
                return true;
            if (val === 'false')
                return false;
            var num = Number(val);
            return isNaN(num) ? val.trimBoth('\'"') : num;
        };
        opts[key] = (val.startsWith('{')) ? val.parseOptions(',') : toValue(val);
    });
    return opts;
};
/*****
 *  jQuery extension
 *  @param el
 *  @returns {boolean}
 *
 *  References: checking element position if it exceeds viewport
 *   - http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
 *   - http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport
 *   - http://stackoverflow.com/questions/36175336/get-element-position-relative-to-top-of-the-viewport
 */
// jQuery.expr.pseudos.offscreen = function (el: Element) {
//     let rect = el.getBoundingClientRect();
//
//     // window.innerWidth includes scrollbars. so, use document.body.clientWidth
//     let maxX = document.body.clientWidth;
//     let maxY = document.body.clientHeight;
//     return (
//         rect.left < 0 || rect.top < 0 ||
//         rect.right >= maxX || rect.bottom >= maxY
//     );
// };
// function delay(msec:number):Promise<void> {
//     return new Promise<void>(function (resolve) {
//         setTimeout(resolve, msec);
//     });
// }
