import { getViewporSize } from "../util/view";

/**
 * @package wicle
 * @module MwdiaQuery
 */

export interface MQOptions {
    // no options yet
}

export interface BreakPoints { [name: string]: number; }    // first entry value MUST be zeop

// predefined media query break points
export const BREAKPOINTS: { [name: string]: BreakPoints } = {
    // screen based states (foundation-site compatible)
    foundation: {
        mini: 0,
        small: 320,
        medium: 640,
        large: 1024,
        xlarge: 1200,
        xxlarge: 1440
    },

    // device based states (semantic-ui compatible)
    semanticUI: {
        mini: 0,
        phone: 320,
        tablet: 768,
        computer: 992,
        largeMonitor: 1200,
        wideMonitor: 1920
    },

    // generic states (UIKit compatible)
    uikit: {
        mini: 0,
        small: 480,
        medium: 768,
        large: 960,
        xlarge: 1220
    },

    // generic states (Bootstrap compatible)
    bootStrap: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    },

    // minimum form
    simple: {
        mobile: 0,
        computer: 960,
    },

    // normal form: default
    basic: {
        small: 0,
        medium: 768,
        large: 960
    }
}

export interface MQState {
    state: string;          // media query(breakpoint) name
    width: number;
    prevState: string;
    prevWidth: number;
    breakPoints: BreakPoints;
}

function mqStateOf(width: number, breakPoints: BreakPoints): string {
    let key;
    for (key in breakPoints) {
        if (breakPoints.hasOwnProperty(key)) {
            if (width < breakPoints[key]) return key;
        }
    }
    return key; // return last key
}


// start media query change detection service
export function mqStart(breakPoints?: BreakPoints, options?: MQOptions) {
    if (!breakPoints) breakPoints = BREAKPOINTS.foundation;
    options = Object.assign({}, {}, options);
    const $window = $(window);
    let mqState: MQState;

    // init
    $window.on('mq:init', (e) => {
        let width = getViewporSize().width;
        let state = mqStateOf(width, breakPoints);
        mqState = {
            state: state,
            width: width,
            prevState: state,
            prevWidth: width,
            breakPoints: breakPoints
        }
    });

    // report current mqState value
    $window.on('mq:report', (e) => $window.trigger('mq:state', [mqState]));

    // detect media query changes
    $window.on('resize', (e) => {
        let width = getViewporSize().width;
        let state = mqStateOf(width, breakPoints);
        if (state != mqState.state) {
            // console.log('[window:resize]', `width=${width}, state=${state}, prevState=${mqState.prevState}`);
            mqState.prevWidth = mqState.width;
            mqState.prevState = mqState.state;
            mqState.width = width;
            mqState.state = state;
            $window.trigger('mq:change', [mqState]);
        }
    });

    // trigger initial events
    $window.trigger('mq:init');
    $window.trigger('resize');
}
