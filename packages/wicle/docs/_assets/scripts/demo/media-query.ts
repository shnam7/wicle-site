/**
 * demo - media query
 */

import { MQState } from "wicle/ui/media-query";

// display values in docs/demo/media-query.md
function updateValues(stat: MQState) {
    // console.log('[demo:mq:change]', `width=${stat.width}, state=${stat.state}, prevState=${stat.prevState}`);
    $('.js-mqstat-state').text(stat.state);
    $('.js-mqstat-width').text(stat.width);
    $('.js-mqstat-prevState').text(stat.prevState);
    $('.js-mqstat-prevWidth').text(stat.prevWidth);
}

// test media query change detection
$(window)
    .on('mq:state', (e, stat: MQState) => updateValues(stat)).trigger('mq:report')
    .on('mq:change', (e, stat: MQState) => updateValues(stat));
