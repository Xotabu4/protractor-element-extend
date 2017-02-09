import {ElementFinder, ElementArrayFinder} from 'protractor'
import {Mock} from 'protractor/built/driverProviders/mock'
import {BaseFragment} from './index'

let Jasmine = require('jasmine')
let jasmine = new Jasmine()

///////////////////////////////////////////////////
///////////////////////MOCKS///////////////////////
function $(locator:string) {
    return new ElementFinder({} as any, {locator: ()=>locator} as any)
}

class TestFragment extends BaseFragment {
    constructor(elem) {
        super(elem)
    }
}
///////////////////////////////////////////////////

describe('BaseFragment', function () {
    let testFrag
    beforeAll(function () {
        testFrag = new TestFragment($('html'))
    })

    it('should still be ElementFinder', function () {
        expect(testFrag instanceof ElementFinder).toBe(true, "Fragment still should be ElementFinder")
        expect(testFrag.locator()).toBe('html', 'Locator must be saved')
    })
})


jasmine.execute(['test.js']);