/// <reference types="selenium-webdriver" />
import { ElementFinder, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
export declare class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder);
}
export declare class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    private class_;
    constructor(extendable: ElementArrayFinder, class_: any);
    get(ind: number): any;
    map<T>(mapFn: (elementFinder?: T, index?: number) => T | any): wdpromise.Promise<T[]>;
    filter(filterFn: (elementFinder: ElementFinder, index?: number) => boolean | wdpromise.Promise<boolean>): ElementArrayFinder;
    reduce(reduceFn: Function, initialValue: any): wdpromise.Promise<any>;
}
