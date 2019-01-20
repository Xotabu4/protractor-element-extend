import { ElementFinder, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
export declare class BaseFragment extends ElementFinder {
    /**
     * Extend this class, to describe single custom fragment on your page
     *
     * @param {ElementFinder} elementFinder ElementFinder that you want to extend
     */
    constructor(elementFinder: ElementFinder);
}
export declare class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    protected class_: any;
    protected elementArrayFinder_: ElementArrayFinder;
    /**
     * Extend this class, to describe collection of custom fragments on your page
     *
     * @param {ElementArrayFinder} elementArrayFinder your ElementArrayFinder that you want to extend
     * @param {any} class_ constructor, that will be used to wrap each element of collection
     */
    constructor(elementArrayFinder: ElementArrayFinder, class_: any);
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
    get(index: number): T;
    /**
     * @returns {T} first fragment in collection
     */
    first(): T;
    /**
     * @returns {T} last fragment in collection
     */
    last(): T;
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
    map(mapFn: (elementFinder?: T, index?: number) => any): wdpromise.Promise<any[]>;
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
    filter(filterFn: (elementFinder?: T, index?: number) => boolean | wdpromise.Promise<boolean> | Promise<boolean>): this;
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
    reduce(reduceFn: (value?: any, elementFinder?: T, index?: number, arr?: any) => any, initialValue: any): wdpromise.Promise<any>;
}
