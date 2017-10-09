/**
 *  Wicle MediaQuery
 */

namespace Wicle {
  export type MQState = string;
  export type MQBreakPoints = { [name:string]:number; }

  export class MediaQuery {
    static defaultOptions: Options = {
    //   breakPoints: {mini: 480, small: 768, medium: 960, large: 1220},
      resizeEventDelay: 100,  // (msec)
    };

    // pre-defined breakpoints
    static BreakPoints = {
      // screen based states (foundation-site compatible)
      Foundation:  {
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

    protected static mqStateChangedEventName = 'mqstatechanged';

    protected breakPoints: MQBreakPoints;
    protected options: Options;
    protected prevState: MQState;

    constructor(breakPoints:MQBreakPoints=MediaQuery.BreakPoints.Foundation,
                options:Options = {}) {
      this.init(breakPoints, options);
      this.startMediaChangeDetection();
    }

    init(breakPoints:MQBreakPoints, options:Options = {}) {
      this.breakPoints = $.extend({}, breakPoints);
      this.options = $.extend(true, {}, MediaQuery.defaultOptions, options);
      this.prevState = this.getMQState();
    }

    // check window resize is crossing media query breakpoints
    protected startMediaChangeDetection() {
      let timer: number = 0;
      let resizeHandler = (e) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          let width = $(window).width();
          let state = this.mqStateOf(width);
          if (state != this.prevState) {
            debug(`MQ:width=${width}, state=${state}, prevState=${this.prevState}`);
            window.dispatchEvent(new CustomEvent(MediaQuery.mqStateChangedEventName,
              {'detail':{state: state, prevState:this.prevState}}));
            this.prevState = state;
          }
        });
        e.stopPropagation();
      };
      $(window).off('resize',resizeHandler).on('resize', resizeHandler);
    }

    /**
     *  Convert width to Media Query name
     *  @param width
     *  @returns {MQState}
     */
    protected mqStateOf(width: number): MQState {
      let key;
      for (key in this.breakPoints) {
        if (this.breakPoints.hasOwnProperty(key)) {
          if (width < this.breakPoints[key]) return key;
        }
      }
      return key;
    }

    protected getMQState(): MQState {
      return this.mqStateOf($(window).width());
    }
  }

  export let mediaQuery = new MediaQuery();
}