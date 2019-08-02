"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    /**
     * Determines whether all the members of an BaseArrayFragment satisfy the specified test.
     * Works the same as native Array.every(): return true for an empty BaseArrayFragment
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @returns {wdpromise.Promise<boolean>} Promise that will be resolved to test result
     */
    every(callbackfn) {
        return this.reduce((value, elementFinder, index, arr) => __awaiter(this, void 0, void 0, function* () {
            const callbackResult = yield callbackfn(elementFinder, index, arr);
            return value && callbackResult;
        }), true);
    }
    /**
     * Determines whether the specified callback function returns true for any element of an BaseArrayFragment.
     * Works the same as native Array.some(): return false for an empty BaseArrayFragment
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @returns {wdpromise.Promise<boolean>} Promise that will be resolved to test result
     */
    some(callbackfn) {
        return this.reduce((value, elementFinder, index, arr) => __awaiter(this, void 0, void 0, function* () {
            const callbackResult = yield callbackfn(elementFinder, index, arr);
            return value || callbackResult;
        }), false);
    }
    /**
     * Returns the value of the first element in the BaseArrayFragment where predicate is true, and undefined
     * otherwise.
     * @param predicate find calls predicate once for each element of the BaseArrayFragment, in ascending
     * order, until it finds one where predicate returns true. Otherwise, find returns undefined.
     * @returns {Promise<T | undefined>} Promise that will be resolved to first found <T extends ElementFinder> or undefined
     */
    find(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.filter((elementFinder, index) => __awaiter(this, void 0, void 0, function* () {
                return predicate(elementFinder, index);
            }));
            return (yield result.count()) ? result.first() : undefined;
        });
    }
}
exports.BaseArrayFragment = BaseArrayFragment;
//# sourceMappingURL=index.js.map