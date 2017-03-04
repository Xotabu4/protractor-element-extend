/// <reference types="selenium-webdriver" />
import { ElementFinder, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
export declare class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder);
}
export declare class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    protected class_: any;
    protected elementArrayFinder_: any;
    constructor(extendable: ElementArrayFinder, class_: any);
    get(ind: number): T;
    map<T>(mapFn: (elementFinder?: T, index?: number) => T | any): wdpromise.Promise<T[]>;
    filter(filterFn: (elementFinder: T, index?: number) => boolean | wdpromise.Promise<boolean>): ElementArrayFinder;
    reduce(reduceFn: Function, initialValue: any): wdpromise.Promise<any>;
}
