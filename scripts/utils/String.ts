/**
 *  Wicle
 *
 *  @module Javascript String extension
 *
 */

declare interface String {
  trimLeft(charList?: string): string;
  trimRight(charList?: string): string;
  trimBoth (charList?: string): string;
  trimAll(charList?: string): string;
  startsWith(charList?: string): boolean;
  endsWith(charList?: string): boolean;
  parseOptions(separator?: string): { [prop: string]: any };
}


/**
 * Trim specified characters on the left side
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimLeft = function (charList?: string): string {
  if (charList === undefined) charList = '\\s';
  return this.replace(new RegExp("^[" + charList + "]+"), "").toString();
};


/**
 * Trim specified characters on the right side
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimRight = function (charList?: string): string {
  if (charList === undefined) charList = '\\s';
  return this.replace(new RegExp("[" + charList + "]+$"), "").toString();
};


/**
 * Trim specified characters on both sides
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimBoth = function (charList?: string): string {
  return this.trimLeft(charList).trimRight(charList);
};


/**
 * Trim specified characters in whole string
 * @param charList is the list of characters to trim
 * @returns {string} trimmed string
 */
String.prototype.trimAll = function (charList?: string): string {
  if (charList === undefined) charList = '\\s';
  return this.replace(new RegExp("[" + charList + "]+", 'g'), "");
};


String.prototype.startsWith = function(str:string) {
  return this.slice(0, str.length) == str;
};


String.prototype.endsWith = function(str:string) {
  return this.slice(-str.length) == str;
};


String.prototype.parseOptions = function (separator: string = ";") {
  let str = this.trimBoth('{}' + separator).trim();
  let opts: { [prop: string]: any } = {};
  str.split(separator).forEach((item: string) => {
    let pos = item.indexOf(':');
    let key = item.substring(0, pos).trim();
    let val = item.substring(pos + 1).trim();
    let toValue = function (val: string) {
      if (!val) return null;
      if (val === 'true') return true;
      if (val === 'false') return false;
      let num = Number(val);
      return isNaN(num) ? val.trimBoth('\'"') : num;
    };
    opts[key] = (val.startsWith('{')) ? val.parseOptions(',') : toValue(val);
  });
  return opts;
};

// /*****
//  *  jQuery extension
//  *  @param el
//  *  @returns {boolean}
//  *
//  *  References: checking element position if it exceeds viewport
//  *   - http://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
//  *   - http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport
//  *   - http://stackoverflow.com/questions/36175336/get-element-position-relative-to-top-of-the-viewport
//  */
// jQuery.expr.pseudos.offscreen = function (el: Element) {
//     let rect = el.getBoundingClientRect();
//
//     // window.innerWidth includes scrollbars. so, use document.body.clientWidth
//     let maxX = document.body.clientWidth;
//     let maxY = document.body.clientHeight;
//     return (
//         rect.left < 0 || rect.top < 0 ||
//         rect.right >= maxX || rect.bottom >= maxY
//     );
// };

// function delay(msec:number):Promise<void> {
//     return new Promise<void>(function (resolve) {
//         setTimeout(resolve, msec);
//     });
// }