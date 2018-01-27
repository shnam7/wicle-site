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
