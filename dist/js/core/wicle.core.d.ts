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
