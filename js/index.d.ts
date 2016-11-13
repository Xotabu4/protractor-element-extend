import { ElementFinder, ElementArrayFinder } from 'protractor';
export declare class BaseElement extends ElementFinder {
    constructor(extendable: ElementFinder);
}
export declare class BaseElementArray extends ElementArrayFinder {
    private class_;
    constructor(extendable: ElementArrayFinder, class_: any);
    get(indx: number): any;
    first(): any;
    last(): any;
    map(func: any): any;
    filter(func: any): any;
}
