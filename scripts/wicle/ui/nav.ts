/**
 *  Wicle scripts
 *
 *  @module Nav
 *
 */


// export type MQEventHandler = (nav: Nav, event: CustomEvent<MediaQuery.MQChangeEventData>) => void;

// interface Options { [key: string]: any }

export interface NavOptions {
    speed?: number;
    showDelay?: number;
    hideDelay?: number;
    parentLink?: boolean;
    singleOpen?: boolean;
    breakPoint?: number;
}

const dynamicClasses = 'w-nav,w-nav-item,w-nav-item-wrapper w-nav-parent,w-nav-child,w-nav-divider js-flip, is-active';
const dynamicElements = 'w-nav-parent-marker,w-nav-accordion-click-area';


export function nav(selector?: string, options?: NavOptions) {
    if (!selector) selector = '.w-nav';
    options = Object.assign({}, {
        speed: 200,
        showDelay: 0,
        hideDelay: 0,
        parentLink: false,
        singleOpen: false,
        breakPoint: 640,
    }, options);

    $(selector).each((index: number, element: HTMLElement) => {
        let $nav = $(element);
        // let classes;

        function flipHandler(e: JQuery.TriggeredEvent) {
            $('.w-nav').find('[js-flip]').removeAttr('js-flip');
        }

        //--- Event handlers ----------------------------------------

        // init
        $nav.on('nav:init', (e, data: NavOptions) => {
            // classes = $nav.attr('class');

            // set basic classes
            $nav.addClass('w-nav')
                .find('li').addClass('w-nav-item')
                .children('a,div').addClass('w-nav-item-wrapper');

            // set parent/child settings for multi-level menus
            $nav.filter('.wo-dropdown,.wo-default,.wo-accordion')
                .find('ul').addClass('w-nav-child') // set parent/child classes, add parent marker
                .parent().addClass('w-nav-parent');

            // $nav.filter(':not(.wo-icon)').find('.w-nav-parent')
            $nav.find('.w-nav-parent')
                .children('.w-nav-item-wrapper').each((idx, el) => {
                    let $el = $(el);
                    // Do not add parent-marker if wo-icon is set for the item
                    if ($el.hasClass('wo-icon')) return;

                    // Do not add top-level parent marker if wo-icon is set
                    if ($el.parent().parent().hasClass('wo-icon')) return;

                    if ($el.children('.w-nav-parent-marker').length === 0)
                        $el.append('<span class="w-nav-parent-marker">');
                });

            // check divider items: item text only with '-' or unicode dashes or spaces
            $nav.find('.w-nav-item').each((index, el) => {
                let $el = $(el);
                // if (!/[^\-\u2014\u2013\s]/.test($el.text())) $el.addClass('w-nav-divider');
                // text should starts with one or more dashes
                if (/^[\-\u2014\u2013]+/.test($el.text())) $el.addClass('w-nav-divider');
            });


            //--- dropdown settings
            let $dropdown = $nav.filter('.wo-dropdown, .wo-default');

            // check out-of-viewport status
            $dropdown.find('.w-nav-parent')
                .off('mouseenter').on('mouseenter', (e) => {
                    let $sub = $(e.currentTarget).children('.w-nav-child');
                    // check element position if it exceeds viewport
                    // ref: http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
                    // ref: http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport
                    // ref: http://stackoverflow.com/questions/36175336/get-element-position-relative-to-top-of-the-viewport
                    let rect = $sub[0].getBoundingClientRect();
                    let flip = undefined;
                    // window.innerWidth includes scrollbars. so, use document.body.clientWidth for horizontal check
                    if (rect.right >= document.body.clientWidth) flip = 'x';
                    if (rect.bottom >= window.innerHeight) flip += 'y';
                    if (flip) $sub.attr('js-flip', flip);
                });

            //--- accordion settings
            let $accordion = $nav.filter('.wo-accordion');
            // add accordion click area to avoid link activation
            $accordion.find('.w-nav-item-wrapper').each((idx, el) => {
                let $el = $(el);
                if ($el.children('.w-nav-accordion-click-area').length === 0)
                    $el.after($('<span class="w-nav-accordion-click-area"></span>'));
            });

            // check manually activated items
            $nav.find('.w-state-active').addClass('is-active');

            // set event handlers
            $accordion.find('.w-nav-item-wrapper,.w-nav-accordion-click-area')
                .off('click').on('click', (e, data) => {
                    let opts = options;
                    let $target = $(e.target);
                    let href = $target.attr('href');

                    // set target to w-nav-parent
                    $target = $target.parent();

                    let $sub = $target.children('.w-nav-child');
                    let $subAll = $target.find('.w-nav-child');
                    if ($sub.length > 0) {
                        if ($sub.css("display") === "none") {
                            $sub.slideDown(opts.speed).siblings("a").addClass('is-active');
                            if (opts.singleOpen) {
                                $target.siblings().find('.w-nav-child').slideUp(opts.speed)
                                    .end().find("a").removeClass('is-active');
                            }
                        }
                        else {
                            $subAll.delay(opts.hideDelay).slideUp(opts.speed)
                                .siblings('a').removeClass('is-active');
                        }
                    }
                    if (opts.parentLink && href) window.location.href = href;
                    e.preventDefault();
                    return false;
                });

            $(window).off('resize', flipHandler).on('resize', flipHandler);
        });

        $nav.on('nav:clean', (e, data) => {
            // remove dynamic elements
            $nav.find(dynamicElements).remove();

            // remove dynamic classes
            $nav.find(dynamicClasses).removeClass(dynamicClasses);

            // remove event handlers
            $(window).off('resize', flipHandler);
            // window.removeEventListener(Nav.mqStateChangedEventName, this.mqChangeHandler);
            $nav.filter('.wo-accordion').find('.w-nav-parent,.w-nav-accordion-click-area').off('click');
        });

        $nav.trigger('nav:init');
    });
}
