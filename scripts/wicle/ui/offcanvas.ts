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
    control: string;
    position: string;		// left, tight, top, bottom
    width: string,
    height: string,
    mode: string,
    duration: number,
    isOpen: boolean;
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
            width: '320px',		// default width of vertical canvas
            height: '320px',	// default height of horizontal canvas
            mode: 'push',       // animation mode. overlay(default) or push
            duration: 500,      // animation duration
            isOpen: false
        };


        //--- Event handlers ----------------------------------------

        // init
        $canvas.on('offcanvas:init', (e, defaultData: OffcanvasData) => {
            let data = Object.assign({}, defaultData, $canvas.data());
            // console.log('init:data=', data, $canvas);

            // init canvas panel
            let pos = data.position;
            if (pos === 'left' || pos == 'right') {
                $canvas.css(pos, '-' + data.width);		// hide canvas
                $canvas.css({ width: `${data.width}`, height: '100%', top: 0 })
            }
            else if (pos === 'top' || pos == 'bottom') {
                $canvas.css(pos, '-' + data.height);	// hide canvas
                $canvas.css({ height: `${data.height}`, width: '100%', left: 0 });
            } else {
                console.warn(`[offcanvas:init] Unknown data-position value: ${pos}.`)
            }
            $canvas.css('display', 'block');

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
            let data = $canvas.data();
            // console.log('open:data=', data);
            if (data.isOpen) return;

            $canvas.trigger('offcanvas:opening', [data]);

            let size = (data.position == 'left' || data.position == 'right')
                ? $canvas.outerWidth() : $canvas.outerHeight();

            if (data.mode == 'push') {
                let side = (data.position == 'left' || data.position == 'right') ? 'left' : 'top';
                let offset = (data.position == 'left' || data.position == 'top') ? size : -size;
                jQuery('html').stop().animate({ ['margin-' + side]: offset }, data.duration);
            }
            $canvas.stop().animate({ [data.position]: 0 }, data.duration, () => {
                data.isOpen = true;
                $canvas.trigger('offcanvas:opend', [data]);
            });

            $canvas.data(data);
            return false;
        });

        // close
        $canvas.on('offcanvas:close', (e) => {
            let data = $canvas.data();
            // console.log('close:data=', data);
            if (!data.isOpen) return;

            $canvas.trigger('offcanvas:closing', [data]);
            let size = (data.position === 'left' || data.position === 'right')
                ? $canvas.outerWidth() : $canvas.outerHeight();

            if (data.mode == 'push') {
                let side = (data.position == 'left' || data.position == 'right') ? 'left' : 'top';
                jQuery('html').stop().animate({ ['margin-' + side]: 0 }, data.duration);
            }
            $canvas.stop().animate({ [data.position]: -size }, data.duration, () => {
                data.isOpen = false;
                $canvas.trigger('offcanvas:closed', [data]);
            });
            $canvas.data(data);
            return false;
        });

        // toggle
        $canvas.on('offcanvas:toggle', (e) => {
            let data = $canvas.data();
            // console.log('open:data=', data);

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
