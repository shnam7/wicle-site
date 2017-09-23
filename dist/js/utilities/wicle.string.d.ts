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
