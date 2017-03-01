import { ElementFinder, ElementArrayFinder } from 'protractor';
export declare class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder);
}
export declare class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    private class_;
    constructor(extendable: ElementArrayFinder, class_: any);
}
