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
        constructor(breakPoints?: MQBreakPoints, options?: Options);
        init(breakPoints: MQBreakPoints, options?: Options): void;
        protected startMediaChangeDetection(): void;
        /**
         *  Convert width to Media Query name
         *  @param width
         *  @returns {MQState}
         */
        protected mqStateOf(width: number): MQState;
        protected getMQState(): MQState;
    }
    let mediaQuery: MediaQuery;
}
