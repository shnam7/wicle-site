/**
 *  Wicle Core
 */
declare namespace Wicle {
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
