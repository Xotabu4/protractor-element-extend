"use strict";
const protractor_1 = require('protractor');
class BaseElement extends protractor_1.ElementFinder {
    constructor(extendable) {
        super(extendable.browser_, extendable.elementArrayFinder_);
    }
}
exports.BaseElement = BaseElement;
class BaseElementArray extends protractor_1.ElementArrayFinder {
    constructor(extendable, class_) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_);
        this.class_ = class_;
    }
    //TODO: Still want to add typings here. Need to continue experiments with generics.
    get(indx) {
        return new this.class_(super.get(indx));
    }
    first() {
        return new this.class_(super.first());
    }
    last() {
        return new this.class_(super.last());
    }
    map(func) {
        //TODO: return result
        return this.map(function (elFinder, index) {
            return func(new this.class_, index);
        });
    }
    filter(func) {
        //TODO: return result
        return this.filter(function (elFinder, index) {
            return func(new this.class_, index);
        });
    }
}
exports.BaseElementArray = BaseElementArray;
//# sourceMappingURL=index.js.map