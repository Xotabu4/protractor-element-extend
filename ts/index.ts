import { ElementFinder, ElementArrayFinder } from 'protractor'
import { promise as wdpromise, WebElement } from 'selenium-webdriver';

export class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}


export class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    protected class_
    protected elementArrayFinder_

    constructor(extendable: ElementArrayFinder, class_: any) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator(), extendable.actionResults_);
        this.elementArrayFinder_ = extendable
        this.class_ = class_
    }

    get(ind: number): T {
        return new this.class_(super.get(ind))
    }

    map<T>(mapFn: (elementFinder?: T, index?: number) => T | any): wdpromise.Promise<T[]> {
        return super.map((elementFinder, index) => {
            return mapFn(new this.class_(elementFinder), index)
        })
    };

    filter(filterFn: (elementFinder: T, index?: number) => boolean | wdpromise.Promise<boolean>): ElementArrayFinder {
        // darkness obsesses me...
        return new (this.constructor as any) (super.filter((elementFinder, index) => {
            return filterFn(new this.class_(elementFinder), index)
        }), this.class_)
    }

    reduce(reduceFn: Function, initialValue: any): wdpromise.Promise<any> {
        return super.reduce((value, elementFinder, index, arr) => {
            return reduceFn(value, new this.class_(elementFinder), index, arr)
        }, initialValue)
    }

}