import {ElementFinder, ElementArrayFinder} from 'protractor'


export class BaseElement extends ElementFinder {
    constructor(extendable:ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}

export class BaseElementArray<T extends ElementFinder> extends ElementArrayFinder {
    constructor(extendable:ElementArrayFinder, private class_:any) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_)
        
    }
    //TODO: Still want to add typings here. Need to continue experiments with generics.
    get(indx:number):T {
       return new this.class_(super.get(indx))
    }

    first():T {
        return new this.class_(super.first())
    }

    last():T {
        return new this.class_(super.last())
    }

    map(func):any {
        //TODO: return result
        return this.map(function (elFinder, index){
            return func(new this.class_, index)
        })
    }

    filter(func):any {
        //TODO: return result
        return this.filter(function (elFinder, index) {
            return func(new this.class_, index)
        })
    }
}