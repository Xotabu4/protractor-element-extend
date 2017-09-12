import { ElementFinder, ElementArrayFinder } from 'protractor'
import { promise as wdpromise } from 'selenium-webdriver'


export class BaseFragment extends ElementFinder {
    /**
     * Extend this class, to describe single custom fragment on your page
     * 
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     */
    constructor(elementFinder: ElementFinder) {
        // Basically we are recreating ElementFinder again with same parameters
        super(elementFinder.browser_, elementFinder.elementArrayFinder_)
    }
}


export class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    // Internal reference to class that will be used to wrap ElementFinders in ElementArrayFinder
    protected class_
    // Internal reference to unwrapped ElementArrayFinder
    protected elementArrayFinder_: ElementArrayFinder

    /**
     * Extend this class, to describe collection of custom fragments on your page
     * 
     * @param {ElementArrayFinder} elementArrayFinder your ElementArrayFinder that you want to extend
     * @param {any} class_ constructor, that will be used to wrap each element of collection
     */
    constructor(elementArrayFinder: ElementArrayFinder, class_: any) {
        super(elementArrayFinder.browser_, elementArrayFinder.getWebElements, elementArrayFinder.locator(), elementArrayFinder.actionResults_);
        this.elementArrayFinder_ = elementArrayFinder
        this.class_ = class_
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
    get(index: number): T {
        return new this.class_(super.get(index))
    }

    /*
        Since .first() and .last() are using .get() inside, it is not necessary to override them
        But in case using TypeScript - this override will provide additional suggestions for your code.
    */

    /**
     * @returns {T} first fragment in collection
     */
    first(): T {
        return super.first() as T
    }

    /**
     * @returns {T} last fragment in collection
     */
    last(): T {
        return super.last() as T
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
    map(mapFn: (elementFinder?: T, index?: number) => any): wdpromise.Promise<any[]> {
        return super.map((elementFinder, index) => {
            return mapFn(new this.class_(elementFinder), index)
        })
    };

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
    filter(filterFn: (elementFinder?: T, index?: number) => boolean | wdpromise.Promise<boolean> | Promise<boolean>): this {
        // recreating same object, but with different elements inside it by calling constructor again
        // Super-magic here, using 'any' for filter function to allow native promises to be returned
        // So you can use async functions as filterFn
        return new (this.constructor as any)(super.filter((elementFinder, index): any => {
            return filterFn(new this.class_(elementFinder), index)
        }), this.class_)
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
    reduce(reduceFn: (value?: any, elementFinder?: T, index?: number, arr?: any) => any, initialValue: any): wdpromise.Promise<any> {
        return super.reduce((value, elementFinder, index, arr) => {
            return reduceFn(value, new this.class_(elementFinder), index, arr)
        }, initialValue)
    }
}
