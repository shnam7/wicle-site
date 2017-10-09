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
