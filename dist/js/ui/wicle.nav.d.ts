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
