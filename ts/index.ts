import {ElementFinder, ElementArrayFinder} from 'protractor'


export class BaseElement extends ElementFinder {
    constructor(extendable:ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}

export class BaseElementArray extends ElementArrayFinder {
    constructor(extendable:ElementArrayFinder) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_)
    }
}