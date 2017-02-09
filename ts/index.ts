import { ElementFinder, ElementArrayFinder } from 'protractor'

/**
 * This class describe basic fragment that you can use as basic object to inherit
 * Basically this uses provided element browser_ and elementArrayFinder_
 * and use it in ElementFinder constructor.
 */
export class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}