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
        // let getTypedWebElements = () => {
        //     return extendable.getWebElements().then(elements => {
        //         return elements.map((elem) => {
        //             return new class_(ElementFinder.fromWebElement_(extendable.browser_, extendable, extendable.locator_))
        //         })
        //     })
        // }
        super(extendable.browser_, extendable.getWebElements, extendable.locator(), extendable.actionResults_);
        let wrapped = (this)['applyAction_']((value, index, array) => {
            return new class_(protractor_1.ElementFinder.fromWebElement_(extendable.browser_, value, extendable.locator()));
        });
        this.class_ = class_;
        return wrapped;
    }
}
exports.BaseArrayFragment = BaseArrayFragment;
//# sourceMappingURL=index.js.map