"use strict";
const protractor_1 = require("protractor");
class BaseFragment extends protractor_1.ElementFinder {
    constructor(extendable) {
        super(extendable.browser_, extendable.elementArrayFinder_);
    }
}
exports.BaseFragment = BaseFragment;
class BaseArrayFragment extends protractor_1.ElementArrayFinder {
    constructor(extendable, class_) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator(), extendable.actionResults_);
        this.elementArrayFinder_ = extendable;
        this.class_ = class_;
    }
    get(ind) {
        return new this.class_(super.get(ind));
    }
    map(mapFn) {
        return super.map((elementFinder, index) => {
            return mapFn(new this.class_(elementFinder), index);
        });
    }
    ;
    filter(filterFn) {
        return new this.constructor(super.filter((elementFinder, index) => {
            return filterFn(new this.class_(elementFinder), index);
        }), this.class_);
    }
    reduce(reduceFn, initialValue) {
        return super.reduce((value, elementFinder, index, arr) => {
            return reduceFn(value, new this.class_(elementFinder), index, arr);
        }, initialValue);
    }
}
exports.BaseArrayFragment = BaseArrayFragment;
//# sourceMappingURL=index.js.map