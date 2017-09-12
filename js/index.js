"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class BaseFragment extends protractor_1.ElementFinder {
    /**
     * Extend this class, to describe single custom fragment on your page
     *
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     */
    constructor(elementFinder) {
        // Basically we are recreating ElementFinder again with same parameters
        super(elementFinder.browser_, elementFinder.elementArrayFinder_);
    }
}
exports.BaseFragment = BaseFragment;
class BaseArrayFragment extends protractor_1.ElementArrayFinder {
    /**
     * Extend this class, to describe collection of custom fragments on your page
     *
     * @param {ElementArrayFinder} elementArrayFinder your ElementArrayFinder that you want to extend
     * @param {any} class_ constructor, that will be used to wrap each element of collection
     */
    constructor(elementArrayFinder, class_) {
        super(elementArrayFinder.browser_, elementArrayFinder.getWebElements, elementArrayFinder.locator(), elementArrayFinder.actionResults_);
        this.elementArrayFinder_ = elementArrayFinder;
        this.class_ = class_;
    }
    /**
     * Get an element within the ElementArrayFinder by index. The index starts at 0.
     * Negative indices are wrapped (i.e. -i means ith element from last)
     *
     * This does not actually retrieve the underlying element.
     *
     * See documentation for ElementArrayFinder.get function
     * http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.get
     *
     * @param {number} index
     *
     * @returns {T} fragment by specified index
     */
    get(index) {
        return new this.class_(super.get(index));
    }
    /*
        Since .first() and .last() are using .get() inside, it is not necessary to override them
        But in case using TypeScript - this override will provide additional suggestions for your code.
    */
    /**
     * @returns {T} first fragment in collection
     */
    first() {
        return super.first();
    }
    /**
     * @returns {T} last fragment in collection
     */
    last() {
        return super.last();
    }
    /**
     * Allows to apply provided function to each element in this collection.
     * Provided function will receive your custom fragment as first parameter.
     *
     * BUG: Exception on attempt to return ElementFinder from provided function:
     * https://github.com/angular/protractor/issues/2227
     *
     * See documentation for ElementArrayFinder.map function
     * http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.map
     *
     * @param {Function} mapFn Will receive your custom fragment as first parameter
     *
     * @returns {wdpromise.Promise<any[]>} Promise, that will be resolved to array with results.
     */
    map(mapFn) {
        return super.map((elementFinder, index) => {
            return mapFn(new this.class_(elementFinder), index);
        });
    }
    ;
    /**
     * Allows to apply provided function to each element in this collection.
     * Provided function will receive your custom fragment as first parameter.
     * If provided function returns false for some element in collection - this element will be excluded from collection.
     *
     * See documentation for ElementArrayFinder.filter function
     * http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.filter
     *
     * @param {Function} filterFn Will receive your custom fragment as first parameter
     *
     * @returns {T} new object that contains filtered values
     */
    filter(filterFn) {
        // recreating same object, but with different elements inside it by calling constructor again
        // Super-magic here, using 'any' for filter function to allow native promises to be returned
        // So you can use async functions as filterFn
        return new this.constructor(super.filter((elementFinder, index) => {
            return filterFn(new this.class_(elementFinder), index);
        }), this.class_);
    }
    /**
     * Allows to reduce collection into single value.
     *
     * See documentation for ElementArrayFinder.reduce function
     * http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.reduce
     *
     * @param {Function} reduceFn Will receive your custom fragment as second parameter
     * @param {any} initialValue Initial value of the accumulator
     * @returns {wdpromise.Promise<any>} Promise that will be resolved to final value of the accumulator
     */
    reduce(reduceFn, initialValue) {
        return super.reduce((value, elementFinder, index, arr) => {
            return reduceFn(value, new this.class_(elementFinder), index, arr);
        }, initialValue);
    }
}
exports.BaseArrayFragment = BaseArrayFragment;
//# sourceMappingURL=index.js.map