import {ElementFinder, ElementArrayFinder} from 'protractor'


export class BaseElement extends ElementFinder {
    constructor(extendable:ElementFinder) {
        super(extendable.browser_, extendable.elementArrayFinder_)
    }
}

export class BaseElementArray extends ElementArrayFinder {
    constructor(extendable:ElementArrayFinder, private class_:any) {
        super(extendable.browser_, extendable.getWebElements, extendable.locator_, extendable.actionResults_)
        
    }
    //TODO: Still want to add typings here. Need to continue experiments with generics.
    get(indx:number):any {
       return new this.class_(super.get(indx))
    }

    first():any {
        return new this.class_(super.first())
    }

    last():any {
        return new this.class_(super.last())
    }

    map(func):any {
        return this.map(function (elFinder, index){
            return func(new this.class_, index)
        })
    }

    filter(func):any {
        return this.filter(function (elFinder, index) {
            return func(new this.class_, index)
        })
    }
}