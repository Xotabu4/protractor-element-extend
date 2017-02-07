import { ElementFinder, ElementArrayFinder } from 'protractor'


export class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}


export class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    private class_
        
    constructor(extendable: ElementArrayFinder, class_: any) {
        extendable.each((element, number) => new class_(element))
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_) 
    }
}