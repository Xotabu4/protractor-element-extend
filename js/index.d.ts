import { ElementFinder, ElementArrayFinder } from 'protractor';
export declare class BaseElement extends ElementFinder {
    constructor(extendable: ElementFinder);
}
export declare class BaseElementArray<T extends ElementFinder> extends ElementArrayFinder {
    private class_;
    constructor(extendable: ElementArrayFinder, class_: any);
    get(indx: number): T;
    first(): T;
    last(): T;
    map(func: any): any;
    filter(func: any): any;
}
