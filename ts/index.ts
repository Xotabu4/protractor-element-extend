import { ElementFinder, ElementArrayFinder } from 'protractor'
import { promise as wdpromise, WebElement } from 'selenium-webdriver';

export class BaseFragment extends ElementFinder {
    constructor(extendable: ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}


export class BaseArrayFragment<T extends ElementFinder> extends ElementArrayFinder {
    private class_
    constructor(extendable: ElementArrayFinder, class_: any) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator(), extendable.actionResults_);
        this.class_ = class_
    }

    get(ind:number) {
        return new this.class_(super.get(ind))
    }

    map<T>(mapFn: (elementFinder?: T, index?: number) => T | any): wdpromise.Promise<T[]> {
        return super.map((elementFinder, index)=> {
            return mapFn(new this.class_(elementFinder), index)
        })
    };

    filter(filterFn: (elementFinder: ElementFinder, index?: number) => boolean | wdpromise.Promise<boolean>): ElementArrayFinder {
        return super.filter((elementFinder, index)=> {
            return filterFn(new this.class_(elementFinder), index)
        })
    }

    reduce(reduceFn: Function, initialValue: any): wdpromise.Promise<any> {
        return super.reduce((value, elementFinder, index, arr)=> {
            return reduceFn(value, new this.class_(elementFinder), index, arr)
        }, initialValue)
    }

}