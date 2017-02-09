"use strict";
const protractor_1 = require("protractor");
/**
 * This class describe basic fragment that you can use as basic object to inherit
 * Basically this uses provided element browser_ and elementArrayFinder_
 * and use it in ElementFinder constructor.
 */
class BaseFragment extends protractor_1.ElementFinder {
    constructor(extendable) {
        super(extendable.browser_, extendable.elementArrayFinder_);
    }
}
exports.BaseFragment = BaseFragment;
//# sourceMappingURL=index.js.map