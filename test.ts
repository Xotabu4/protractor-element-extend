/** @internal */

import {ElementFinder, ElementArrayFinder} from 'protractor'
import {BaseFragment, BaseArrayFragment} from './index'

let Jasmine = require('jasmine')
let jasmine = new Jasmine()

///////////////////////////////////////////////////
///////////////////////MOCKS///////////////////////
function $(locator:string) {
    let browser = {} as any

    let actionResults_ = {} as any

    return new ElementFinder(browser, $$(locator))
}

function $$(locator:string) {
    let browser = {} as any
    let getWebElements = () => {return Promise.resolve([
        {}, {} , {}    
    ]) as any}
    let actionResults_ = {} as any

    return new ElementArrayFinder(browser, getWebElements, locator, actionResults_)
}

class TestFragment extends BaseFragment {
    constructor(elem) {
        super(elem)
    }

    click() {
        super.click();
        return true as any
    }
}

class TestArrayFragment extends BaseArrayFragment<TestFragment> {
    constructor(elementArrayFinder) {
        super(elementArrayFinder, TestFragment)
    }

    click() {
        return true as any
    }
}
///////////////////////////////////////////////////

describe('BaseFragment', ()=> {
    let testFrag
    beforeEach(function () {
        testFrag = new TestFragment($('html'))
    })

    it('should still be ElementFinder', function () {
        expect(testFrag instanceof ElementFinder).toBeTruthy("Fragment still should be ElementFinder")
    })

    it('should allow override of WebElement methods', async function () {
        let res = testFrag.click()
        expect(res).toBe(true)
    })
})

describe('BaseArrayFragment', ()=> {
    let arrayFrag
    beforeEach(function () {
        arrayFrag = new TestArrayFragment($$('html'))
    })

    it('should still be ElementFinder', function () {
        expect(arrayFrag instanceof ElementArrayFinder).toBeTruthy("BaseArrayFragment should still be ElementArrayFinder")
    })

    it(' ".map()" function must iterate thru your custom elements, not ElementFinders', ()=> {
        arrayFrag.map(customel=> {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating")
        })
    })

    it(' ".each()" must iterate thru your custom elements, not ElementFinders', ()=> {
        arrayFrag.each(customel=> {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating")
        })
    })

    it(' ".filter()" must iterate thru your custom elements, not ElementFinders', (done)=> {
        arrayFrag.filter(customel=> {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating")
        }).then(done)
    })

    it(' ".filter()" must return your extended from ElementArrayFinder type', (done)=> {
        let filteredRes = arrayFrag.filter(()=> true)
        expect(filteredRes instanceof TestArrayFragment).toBeTruthy()
        done()
    })

    it(' ".reduce()" must iterate thru your custom elements, not ElementFinders', (done)=> {
        arrayFrag.reduce((value, customel) => {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating")
        }).then(done)
    })
    
    it(' ".get()" must return custom element, not ElementFinder', ()=> {
        expect(arrayFrag.get(0) instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'get' ")
        expect(arrayFrag.first() instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'first' ")
        expect(arrayFrag.last() instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'last' ")
    })

    it('should allow override of ElementArrayFinder methods', async function () {
        let res = arrayFrag.click()
        expect(res).toBe(true)
    })

    it('should allow override of ElementArrayFinder methods', async function () {
        let res = arrayFrag.click()
        expect(res).toBe(true)
    })
})


jasmine.execute(['test.js']);