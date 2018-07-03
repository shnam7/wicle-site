
export type Options = { [key: string]: any; }

export interface MediaQueryOptions {
  resizeEventDelay?: number;    // msec
}

export interface NavOptions {
  speed?: number;
  showDelay?: number;
  hideDelay?: number;
  parentLink?: boolean;
  singleOpen?: boolean,
  breakPoint?: number;
  mqChangeToMobile?: null,   // function(this:Nav, e:any):void;
  mqChangeToNormal?: null,   // function(this:Nav, e:any):void;
};