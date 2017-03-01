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
        // let getTypedWebElements = () => {
        //     return extendable.getWebElements().then(elements => {
        //         return elements.map((elem) => {
        //             return new class_(ElementFinder.fromWebElement_(extendable.browser_, extendable, extendable.locator_))
        //         })
        //     })
        // }
        super(extendable.browser_, extendable.getWebElements, extendable.locator(), extendable.actionResults_);
        let wrapped = (this)['applyAction_']((value: WebElement, index: number, array: WebElement[]) => {
            return new class_(ElementFinder.fromWebElement_(extendable.browser_, value, extendable.locator()))
        })
        this.class_ = class_

        return wrapped
    }

    // asElementFinders_(): wdpromise.Promise<T[]> {
    //     return this.getWebElements()
    // };
}