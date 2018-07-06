/// <reference types="jquery" />
declare module "core/types" {
    export type Options = {
        [key: string]: any;
    };
    export interface MediaQueryOptions {
        resizeEventDelay?: number;
    }
    export interface NavOptions {
        speed?: number;
        showDelay?: number;
        hideDelay?: number;
        parentLink?: boolean;
        singleOpen?: boolean;
        breakPoint?: number;
        mqChangeToMobile?: null;
        mqChangeToNormal?: null;
    }
}
declare module "utils/utils" {
    export function getViewporSize(): {
        width?: number;
        height?: number;
    };
}
declare module "core/MediaQuery" {
    /**
     *  Wicle MediaQuery
     */
    import { Options } from "core/types";
    export type MQState = string;
    export type MQBreakPoints = {
        [name: string]: number;
    };
    export interface MQChangeEventData {
        state: MQState;
        prevState: MQState;
        breakPoints: MQBreakPoints;
        width: number;
        prevWidth: number;
        direction: 'up' | 'down';
    }
    class MediaQuery {
        static defaultOptions: Options;
        static BreakPoints: {
            [name: string]: MQBreakPoints;
        };
        protected static mqStateChangedEventName: string;
        protected breakPoints: MQBreakPoints;
        protected options: Options;
        protected prevState: MQState;
        protected prevWidth: number;
        constructor(breakPoints?: MQBreakPoints, options?: Options);
        init(breakPoints: MQBreakPoints, options?: Options): void;
        setBreakPoints(breakPoints: string | MQBreakPoints): void;
        protected startMediaChangeDetection(): void;
        /**
         *  Convert width to Media Query name
         *  @param width
         *  @returns {MQState}
         */
        protected mqStateOf(width: number): MQState;
        protected getMQState(width?: number): MQState;
    }
    export default MediaQuery;
}
declare module "ui/Nav" {
    /**
     *  Wicle scripts
     *
     *  @module Nav
     *
     */
    import { Options } from "core/types";
    import { MQChangeEventData } from "core/MediaQuery";
    export type MQEventHandler = (nav: Nav, event: CustomEvent<MQChangeEventData>) => void;
    export interface NavOptions {
        speed?: number;
        showDelay?: number;
        hideDelay?: number;
        parentLink?: boolean;
        singleOpen?: boolean;
        breakPoint?: number;
        mqChangeToMobile?: MQEventHandler;
        mqChangeToNormal?: MQEventHandler;
    }
    class Nav {
        static defaultOptions: NavOptions;
        protected static dynamicClasses: string;
        protected static dynamicElements: string;
        protected static mqStateChangedEventName: string;
        protected options: Options;
        protected element: Element;
        protected classes: string;
        protected flipHandler: (e: JQuery.Event<EventTarget, null>) => void;
        protected mqChangeHandler: (e: CustomEvent<MQChangeEventData>) => void;
        protected accordionClickEventHandler: (e: JQuery.Event<EventTarget, null>) => void;
        constructor(el: Element, options?: Options);
        create(): void;
        destroy(): void;
        static start(selector: string, options?: Options): void;
    }
    export default Nav;
}
declare module "ui/Parallax" {
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
        constructor(surfaceContents: HTMLElement, perspective?: number);
        scroll(scrollPos: number): void;
    }
}
/// <amd-module name="wicle" />
declare module "wicle" {
    import MediaQuery from "core/MediaQuery";
    import * as Parallax from "ui/Parallax";
    import { Options } from "core/types";
    const Wicle: {
        readonly mq: MediaQuery;
        nav: (selector: string, options?: Options) => void;
        Parallax: typeof Parallax;
    };
    export default Wicle;
}
/**
 *  Wicle
 *
 *  @module Javascript String extension
 *
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
//# sourceMappingURL=wicle.d.ts.map