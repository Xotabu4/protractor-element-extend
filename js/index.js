"use strict";
const protractor_1 = require('protractor');
class BaseElement extends protractor_1.ElementFinder {
    constructor(extendable) {
        super(extendable.browser_, extendable.elementArrayFinder_);
    }
}
exports.BaseElement = BaseElement;
class BaseElementArray extends protractor_1.ElementArrayFinder {
    constructor(extendable) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_);
    }
}
exports.BaseElementArray = BaseElementArray;
