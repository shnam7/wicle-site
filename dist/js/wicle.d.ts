/// <reference types="jquery" />
/**
 *  Wicle Core
 */
declare namespace Wicle {
    const $: JQueryStatic<HTMLElement>;
    type Options = {
        [optionName: string]: any;
    };
    let options: Options;
    function init(options?: Options): void;
    function getViewporSize(): {
        width: any;
        height: any;
    };
}
/**
 *  Wicle MediaQuery
 */
declare namespace Wicle {
    type MQState = string;
    type MQBreakPoints = {
        [name: string]: number;
    };
    class MediaQuery {
        static defaultOptions: Options;
        static BreakPoints: {
            Foundation: {
                mini: number;
                small: number;
                medium: number;
                large: number;
                xlarge: number;
                xxlarge: number;
            };
            SemanticUI: {
                mini: number;
                phone: number;
                tablet: number;
                computer: number;
                largeMonitor: number;
                wideMonitor: number;
            };
            UIKit: {
                mini: number;
                small: number;
                medium: number;
                large: number;
                xlarge: number;
            };
            BootStrap: {
                xs: number;
                sm: number;
                md: number;
                lg: number;
                xl: number;
            };
            Simple: {
                mobile: number;
                computer: number;
            };
            Basic: {
                small: number;
                medium: number;
                large: number;
            };
        };
        protected static mqStateChangedEventName: string;
        protected breakPoints: MQBreakPoints;
        protected options: Options;
        protected prevState: MQState;
        protected prevWidth: number;
        constructor(breakPoints?: MQBreakPoints, options?: Options);
        init(breakPoints: MQBreakPoints, options?: Options): void;
        protected startMediaChangeDetection(): void;
        /**
         *  Convert width to Media Query name
         *  @param width
         *  @returns {MQState}
         */
        protected mqStateOf(width: number): MQState;
        protected getMQState(width?: any): MQState;
    }
    let mediaQuery: MediaQuery;
}
/**
 *  Wicle scripts
 *
 *  @module Nav
 *
 */
declare namespace Wicle {
    class Nav {
        static defaultOptions: {
            speed: number;
            showDelay: number;
            hideDelay: number;
            parentLink: boolean;
            singleOpen: boolean;
            breakPoint: number;
            mqChangeToMobile: any;
            mqChangeToNormal: any;
        };
        protected static dynamicClasses: string;
        protected static dynamicElements: string;
        protected static mqStateChangedEventName: string;
        protected options: Options;
        protected element: Element;
        protected classes: string;
        protected flipHandler: (e: any) => void;
        protected mqChangeHandler: (e: any) => void;
        protected accordionClickEventHandler: (e: any) => void;
        constructor(el: Element, options?: Options);
        create(): void;
        destroy(): void;
    }
    function nav(selector: string, options?: Options): void;
}
declare namespace Wicle {
    namespace Parallax {
        class Container {
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
            private onContainerScroll(e);
            addSurface(surface: Surface): void;
        }
        class Surface {
            perspective: number;
            private content;
            constructor(surfaceContents: HTMLElement, perspective?: number);
            scroll(scrollPos: number): void;
        }
    }
}
/**
 *  Wicle
 *
 *  @module Javascript String extension
 *
 */
interface String {
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
