/**
 *  Wicle Core
 */
var Wicle;
(function (Wicle) {
    // export let nav = new Nav();
    var defaultOptions = {
        // messaging options
        debug: true,
        warning: true
    };
    Wicle.options = defaultOptions;
    function init(options) {
        if (options === void 0) { options = {}; }
        Wicle.options = $.extend(true, {}, defaultOptions, options);
    }
    Wicle.init = init;
    /**
     *  utilities
     *
     */
    function debug() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Wicle.options.debug)
            return log.apply(void 0, ['Wicle:Debug:'].concat(rest));
    }
    Wicle.debug = debug;
    function warn() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return log.apply(void 0, ['Wicle:Warning:'].concat(rest));
    }
    Wicle.warn = warn;
    function log(prefix) {
        if (prefix === void 0) { prefix = 'Wicle:'; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return console.log.apply(console, [prefix].concat(rest));
    }
    Wicle.log = log;
})(Wicle || (Wicle = {}));
// type MediaState = 'mini' | 'small' | 'medium' | 'large' | 'xlarge';
// // type BreakPoints = { mini: number, small: number, medium:number, large: number, xlarge: number }
//
//
// interface Component {
//   readonly name: string;
//   options?: Options;
//   onMediaChange?(state:MediaState, prevState: MediaState): void;
// }
//
// type Components = {[name:string]:Component};
//
// interface WicleInterface {
//   addComponent(component: Component): Component;
//   getComponent(name: string): Component;
// }
//
//
//
// class Wicle  {
//   static prevMQState:MediaState;
//   static defaultOptions:Options = {
//     breakPoints: {mini: 480, small: 768, medium: 960, large: 1220},
//     resizeEventDelay: 100,  // (msec)
//   };
//
//   protected components: Components;
//   protected options: Options;
//   // protected breakPoints: Wicle.BreakPoints;
//
//
//   constructor(options:Options = {}) {
//     this.components = {};
//     this.options = $.extend({}, Wicle.defaultOptions, options);
//     Wicle.prevMQState = Wicle.getMediaState();
//     this.checkMediaChanges();
//   }
//
//   // register wicle component
//   addComponent(component: Component): Component {
//     let name = component.name;
//     if (this.components[name]) warn('Duplicate component:', name);
//     this.components[name] = component;
//     return component;
//   }
//
//   getComponent(name: string): Component {
//     return this.components[name];
//   }
//
//   // check window resize is crossing media query breakpoints
//   protected checkMediaChanges() {
//     let timer: number = 0;
//     $(window).resize((e) => {
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => {
//         let width = $(window).width();
//         let state = Wicle.mediaStateOf(width);
//         if (Wicle.mediaStateOf(width) != Wicle.prevMQState) {
//           debug(`MQ:width=${width}, state=${state}, prevState=${Wicle.prevMQState}`);
//           for (let name in this.components)
//             this.components[name].onMediaChange(state, Wicle.prevMQState);
//           Wicle.prevMQState = state;
//         }
//       }, this.options.resizeEventDelay);
//       e.stopPropagation();
//     });
//   }
//
//   // get element offset and outer size
//   // getElementPosize(element) {
//   //     let $element = $(element), ret={}, tmpCSS=null, $tmpEl=null;
//   //     if (!$element.is(":visible")) {
//   //         tmpCSS = {
//   //             position: $element.css("position"),
//   //             visibility: $element.css("visibility"),
//   //             display: $element.css("display")
//   //         };
//   //         $element.css({position: 'absolute', visibility: 'hidden', display: 'block'});
//   //     }
//   //     let offset = $element.offset();
//   //     ret = { left:offset.left, top:offset.top,
//   //         width:$element.outerWidth(), height:$element.outerHeight() };
//   //     if (tmpCSS) $element.css(tmpCSS); // reset element
//   //     return ret;
//   // }
//
//   /**
//    *  Convert width to Media Query name
//    *  @param width
//    *  @returns {MQState}
//    */
//   static mediaStateOf(width: number): MediaState {
//     let breakPoints = Wicle.defaultOptions.breakPoints;
//     for (let key in breakPoints) {
//       if (breakPoints.hasOwnProperty(key)) {
//         if (width < breakPoints[key]) return <MediaState>key;
//       }
//     }
//     return "xlarge";
//   }
//
//   static getMediaState(): MediaState {
//     return Wicle.mediaStateOf($(window).width());
//   }
// }
//
//
//
// window.wicle || (window.wicle = new Wicle());
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
            this.breakPoints = $.extend({}, breakPoints);
            this.options = $.extend(true, {}, MediaQuery.defaultOptions, options);
            this.prevState = this.getMQState();
        };
        // check window resize is crossing media query breakpoints
        MediaQuery.prototype.startMediaChangeDetection = function () {
            var _this = this;
            var timer = 0;
            var resizeHandler = function (e) {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(function () {
                    var width = $(window).width();
                    var state = _this.mqStateOf(width);
                    if (state != _this.prevState) {
                        Wicle.debug("MQ:width=" + width + ", state=" + state + ", prevState=" + _this.prevState);
                        window.dispatchEvent(new CustomEvent(MediaQuery.mqStateChangedEventName, { 'detail': { state: state, prevState: _this.prevState } }));
                        _this.prevState = state;
                    }
                });
                e.stopPropagation();
            };
            $(window).off('resize', resizeHandler).on('resize', resizeHandler);
        };
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
        MediaQuery.prototype.getMQState = function () {
            return this.mqStateOf($(window).width());
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
                var state = e.detail.state;
                var prevState = e.detail.prevState;
                console.log(e.detail, this);
                if (state == 'large' && prevState == 'xlarge') {
                    // $('.w-nav.wo-accordion').removeClass('wo-accordion')
                    //   .addClass('wo-horizontal,wo-dropdown');
                }
                if (state == 'xlarge' && prevState == 'large') {
                    // $('.w-nav.wo-horizontal').removeClass('wo-horizontal,wo-dropdown')
                    //   .addClass('wo-accordion');
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
            this.classes = $nav.attr('class');
            $.data(this.element, 'w-nav', this);
            // set basic classes
            $nav.addClass('w-nav')
                .find('li').addClass('w-nav-item')
                .children('a,div').addClass('w-nav-item-wrapper');
            // set parent/child settings for multi-level menus
            $nav.filter('.wo-dropdown,.wo-default,.wo-accordion')
                .find('ul').addClass('w-nav-child') // set parent/child classes, add parent marker
                .parent().addClass('w-nav-parent')
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
                if (!/[^\-\u2014\u2013\s]/.test($el.text()))
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
                .on('click', this.accordionClickEventHandler);
            $(window).on('resize', this.flipHandler);
            window.addEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
        };
        Nav.prototype.destroy = function () {
            var $nav = $(this.element);
            // remove event handlers
            $(window).off('resize', this.flipHandler);
            window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            $nav.filter('.wo-accordion').find('.w-nav-parent,.w-nav-accordion-click-area').off('click');
            // remove dynamic elements
            $nav.find(Nav.dynamicElements).remove();
            // remove dynamic classes
            $nav.find(Nav.dynamicClasses).removeClass(Nav.dynamicClasses);
            // remove nav object
            $.removeData(this.element, 'w-nav');
        };
        Nav.defaultOptions = {
            speed: 200,
            showDelay: 0,
            hideDelay: 0,
            parentLink: false,
            singleOpen: true,
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
