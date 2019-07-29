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
    isOpen: boolean;
}

export function offcanvas(selector?: string, options?: OffcanvasOptions) {
    if (!selector) selector = '.l-site-offcanvas';
    let opts: OffcanvasOptions = $.extend({}, {
        closeButton: true,
        closeButtonSelector: '.offcanvas-close-button',
        closeOnBackgroundClick: true,
    }, options);

    $(selector).each((index: number, item: HTMLElement) => {
        let $canvas = $(item);
        let canvasData = $.extend({}, {
            control: null,
            position: 'left',
            width: '320px',		// default width of vertical canvas
            height: '320px',	// default height of horizontal canvas
            isOpen: false
        }, $canvas.data());

        //--- Event handlers ----------------------------------------

        // init
        $canvas.on('offcanvas:init', (e, data: OffcanvasData) => {
            data = $.extend({}, canvasData, data);
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
        });

        // open
        $canvas.on('offcanvas:open', (e, data: OffcanvasData) => {
            // console.log('open:data=', data);
            data = $.extend({}, canvasData, data)
            if (data.isOpen) return;
            $canvas.trigger('offcanvas:opening', [data]);

            $canvas.css(data.position, 0);
            canvasData.isOpen = true;
            $canvas.trigger('offcanvas:opend', [data]);
            return false;
        });

        // close
        $canvas.on('offcanvas:close', (e, data: OffcanvasData) => {
            data = $.extend({}, canvasData, data)
            // console.log('close:data=', data);
            if (!data.isOpen) return;

            $canvas.trigger('offcanvas:closing', [data]);
            let size = (data.position === 'left' || data.position === 'right')
                ? $canvas.outerWidth() : $canvas.outerHeight();
            $canvas.css(data.position, -size);
            canvasData.isOpen = false;
            $canvas.trigger('offcanvas:closed', [data]);
            return false;
        });

        // toggle
        $canvas.on('offcanvas:toggle', (e, data) => {
            // console.log('toggle:data=', data, 'offcanvas:' + (data.isOpen ? 'close' : 'open'));
            $canvas.trigger('offcanvas:' + (data.isOpen ? 'close' : 'open'), [data])
            return false;
        });

        // disable click on canvas panel
        $canvas.on('click', (e) => { return false; })


        //-------------------------------------------------
        //	Control buttons
        //-------------------------------------------------

        // add offcanvas-close-button
        if (opts.closeButton) $canvas.prepend("<div class='offcanvas-close-button'></div>");

        // set offcanvas control button handler
        if (canvasData.control) $(canvasData.control).on('click', (e) => {
            $canvas.trigger('offcanvas:toggle', [canvasData]);
            e.preventDefault();   // this prevent screen repositioning triggered by <a> tag
            return false;
        });

        $canvas.find(opts.closeButtonSelector).on('click', (e) => {
            $(canvasData.control).trigger('click');
            e.preventDefault();
            return false;
        })

        $canvas.trigger('offcanvas:init', [canvasData]);
    });

    // set offcanvas close handler including background(.l-site) click
    if (opts.closeOnBackgroundClick) $('.l-site').on('click', (e) => {
        $(selector).trigger('offcanvas:close');  // close on background click
    });
}
