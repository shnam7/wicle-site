/**
 *  Wicle Core
 */

namespace Wicle {
  export type Options = { [optionName: string]: any; }

  const defaultOptions:Options = {
  };

  export let options:Options = defaultOptions;

  export function init(options:Options={}) {
    Wicle.options = $.extend(true, {}, defaultOptions, options);
  }

  // ref: https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
  export function getViewporSize() {
    let e:any = window;
    let a:string = 'inner';
    if ( !('innerWidth' in window) ) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
  }
}

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