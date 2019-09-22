declare module "wicle/util/view" {
    /**
     *  @package wicle *
     */
    export function getViewporSize(): {
        width: number;
        height: number;
    };
}
declare module "wicle/ui/media-query" {
    /**
     * @package wicle
     * @module MwdiaQuery
     */
    export interface MQOptions {
    }
    export interface BreakPoints {
        [name: string]: number;
    }
    export const BREAKPOINTS: {
        [name: string]: BreakPoints;
    };
    export interface MQState {
        state: string;
        width: number;
        prevState: string;
        prevWidth: number;
        breakPoints: BreakPoints;
    }
    export function mqStart(breakPoints?: BreakPoints, options?: MQOptions): void;
}
declare module "wicle/ui/nav" {
    /**
     *  Wicle scripts
     *
     *  @module Nav
     *
     */
    export interface NavOptions {
        speed?: number;
        showDelay?: number;
        hideDelay?: number;
        parentLink?: boolean;
        singleOpen?: boolean;
        breakPoint?: number;
    }
    export function nav(selector?: string, options?: NavOptions): void;
}
declare module "wicle/ui/offcanvas" {
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
    export function offcanvas(selector?: string, options?: OffcanvasOptions): void;
}
declare module "wicle/ui/parallax" {
    /**
     * @package wicle
     *
     * Example:
     * Container = [Surface1, Surface2, ...], perspective=0.5
     * Surface1 scrolls normally, Surface2 scrolls 50%, Surface scrolls 25%, ...
     *
     * Note: If parent node has 'transform' property, 'fixed' property of Surface object does not work.
     *       In this case, Surface will move by the parent, and move again by the scroll handler,
     *          which will make all the surfaces move faster than window
     */
    export class Container {
        private content;
        private surface;
        private perspective;
        private lastPerspective;
        /**
         *   Creates a Container for a Parallax
         *
         *   @param {HTMLElement} scrollableContent The container that will be parallaxed
         *   @param {perspective} perspective The ratio of how much back content should be scrolled
         *          relative to forward content. For example, if this value is 0.5, and there are 2 surfaces,
         *          the front-most surface would be scrolled normally, and the surface behind it would be scrolled
         *          half as much.
         */
        constructor(scrollableContent: HTMLElement, perspective: number);
        private onContainerScroll;
        addSurface(surface: Surface): void;
    }
    export class Surface {
        perspective: number;
        private content;
        /**
         *  Create a Surface for a Palallax
         *
         *  @param surfaceContents
         *  @param perspective Initial perspective of the surface.
         *  @param cssPosition CSS position property: Should be absolute or fixed
         */
        constructor(surfaceContents: HTMLElement, perspective?: number, cssPosition?: string);
        scroll(scrollPos: number): void;
    }
}
/**
 * @package wicle
 * @module
 * Javascript String extension
 */
declare interface String {
    trimLeft(charList?: string): string;
    trimRight(charList?: string): string;
    trimBoth(charList?: string): string;
    trimAll(charList?: string): string;
    startsWith(charList?: string): boolean;
    endsWith(charList?: string): boolean;
    parseOptions(separator?: string): {
        [prop: string]: any;
    };
}
