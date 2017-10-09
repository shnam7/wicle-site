/**
 *  Wicle Core
 */
declare namespace Wicle {
    type Options = {
        [optionName: string]: any;
    };
    let options: Options;
    function init(options?: Options): void;
    /**
     *  utilities
     *
     */
    function debug(...rest: any[]): void;
    function warn(...rest: any[]): void;
    function log(prefix?: string, ...rest: any[]): void;
}
