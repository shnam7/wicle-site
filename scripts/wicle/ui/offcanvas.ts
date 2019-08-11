/**
 * @package wicle
 *
 * @usage
 * 	<section
 * 		class="l-site-offcanvas"		// offcanvas class name
 * 		data-control=".wz-control"		// name of control button
 * 		data-position="left"			// ofcanvas position: left, top, right, bottom
 * 		data-width="200px"				// data-height for horizontal canvas
 * 	>
 * 		Offcanvas contents...
 * 	</section>
 *
 *	<button class="w-button wz-control">Button</button>	// control button
 */

export interface OffcanvasOptions {
    closeButton: boolean;
    closeButtonSelector: string;
    closeOnBackgroundClick: boolean;
}

interface OffcanvasData {
    control: string;        // selector for open/close control
    position: string;	    // location of the canvas: left, top, right, bottom
    width: string,          // default width of vertical canvas
    height: string,         // default height of horizontal canvas
    mode: string,           // animation mode. overlay(default) or push
    duration: number,       // animation duration
    pusher: string;         // selector for element to be pushed on open
    isOpen: boolean;        // open/close state
}


export function offcanvas(selector?: string, options?: OffcanvasOptions) {
    if (!selector) selector = '.l-site-offcanvas';
    let opts: OffcanvasOptions = Object.assign({}, {
        closeButton: true,
        closeButtonSelector: '.offcanvas-close-button',
        closeOnBackgroundClick: true,
    }, options);

    jQuery(selector).each((index: number, item: HTMLElement) => {
        let $canvas = jQuery(item);
        let defaultCanvasData: OffcanvasData = {
            control: null,
            position: 'left',
            width: '320px',
            height: '320px',
            mode: 'push',
            duration: 500,
            pusher: '.l-site',
            isOpen: false
        };

        function hideCSS(data: OffcanvasData) {
            let pos = data.position;
            if (pos === 'left' || pos == 'right') return {
                width: `${data.width}`,
                height: '100%',
                top: 0,
                left: (pos == 'left') ? 0 : 'auto',
                right: (pos == 'left') ? 'auto' : 0,
                transform: (pos == 'left') ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)'
            }
            else if (pos === 'top' || pos == 'bottom') return {
                width: `100%`,
                height: `${data.height}`,
                left: 0,
                top: (pos == 'top') ? 0 : 'auto',
                bottom: (pos == 'top') ? 'auto' : 0,
                transform: (pos == 'top') ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 100%, 0)'
            }
        }

        function pushCSS(data: OffcanvasData) {
            if (data.mode != 'push') return undefined;

            let pos = data.position;
            if (pos == 'left') return { transform: 'translate3d(' + data.width + ',0,0)' };
            if (pos == 'right') return { transform: 'translate3d(-' + data.width + ',0,0)' };
            if (pos == 'top') return { transform: 'translate3d(0,' + data.height + ',0)' };
            if (pos == 'bottom') return { transform: 'translate3d(0,-' + data.height + ',0)' };
        }

        //--- Event handlers ----------------------------------------

        // init
        $canvas.on('offcanvas:init', (e, defaultData: OffcanvasData) => {
            let data = Object.assign({}, defaultData, $canvas.data());
            // console.log('init:data=', data, $canvas);

            $canvas
                .css(hideCSS(data))
                .css({ transition: 'transform ' + data.duration / 1000 + 's', });
            setTimeout(() => { $canvas.css({ display: 'block' }); }, 0);

            // set animation timing for pusher
            if (data.mode == 'push') jQuery(data.pusher).css({
                'overflow-x': 'hidden',
                transition: data.duration / 1000 + 's'
            });

            // disable click on canvas panel
            $canvas.on('click', (e) => { return false; })

            // set offcanvas control button handler
            if (data.control) jQuery(data.control).on('click', (e) => {
                $canvas.trigger('offcanvas:toggle');
                e.preventDefault();   // this prevent screen repositioning triggered by <a> tag
                return false;
            });

            // add offcanvas-close-button
            if (opts.closeButton) $canvas.prepend("<div class='offcanvas-close-button'></div>")
                .find(opts.closeButtonSelector).on('click', (e) => {
                    jQuery(data.control).trigger('click');
                    e.preventDefault();
                    return false;
                })

            $canvas.data(data);
            return false;
        });

        // open
        $canvas.on('offcanvas:open', (e) => {
            let data = $canvas.data() as OffcanvasData;
            // console.log('open:data=', data);
            if (data.isOpen) return;

            $canvas.trigger('offcanvas:opening', [data]);
            $canvas.css({ transform: 'translate3d(0, 0, 0)' });
            if (data.mode == 'push') jQuery(data.pusher).css(pushCSS(data));

            data.isOpen = true;
            $canvas.data(data);
            $canvas.trigger('offcanvas:opend', [data]);
            return false;
        });

        // close
        $canvas.on('offcanvas:close', (e) => {
            let data = $canvas.data() as OffcanvasData;
            if (!data.isOpen) return;
            // console.log('close:data=', data);

            $canvas.trigger('offcanvas:closing', [data]);
            // transform MUST be 'none' not 'translate3d(0,0,0)'.
            // Or, 'fixed' property of the cheldren will not work, making Parallax not to work
            if (data.mode == 'push') jQuery(data.pusher).css({ transform: 'none' });
            $canvas.css(hideCSS(data));

            data.isOpen = false;
            $canvas.data(data);
            $canvas.trigger('offcanvas:closed', [data]);
            return false;
        });

        // toggle
        $canvas.on('offcanvas:toggle', (e) => {
            let data = $canvas.data();
            // console.log('toggle:data=', data, 'offcanvas:' + (data.isOpen ? 'close' : 'open'));
            $canvas.trigger('offcanvas:' + (data.isOpen ? 'close' : 'open'), [data])
            return false;
        });

        // trigger init event
        $canvas.trigger('offcanvas:init', [defaultCanvasData]);
    });

    // set offcanvas close handler including background(.l-site) click
    if (opts.closeOnBackgroundClick) jQuery('html').on('click', (e) => {
        jQuery(selector).trigger('offcanvas:close');  // close on background click
    });
}
