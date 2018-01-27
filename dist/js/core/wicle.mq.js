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
