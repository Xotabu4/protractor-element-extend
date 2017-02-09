"use strict";
const protractor_1 = require("protractor");
const index_1 = require("./index");
let Jasmine = require('jasmine');
let jasmine = new Jasmine();
//let describe:any, it:any, beforeEach:any, expect:any
function $(locator) {
    return new protractor_1.ElementFinder({}, { locator: () => locator });
}
class TestFragment extends index_1.BaseFragment {
    constructor(elem) {
        super(elem);
    }
}
describe('BaseFragment', function () {
    let testFrag;
    beforeAll(function () {
        testFrag = new TestFragment($('html'));
    });
    it('should still be ElementFinder', function () {
        expect(testFrag instanceof protractor_1.ElementFinder).toBe(true, "Fragment still should be ElementFinder");
        expect(testFrag.locator()).toBe('html', 'Locator must be saved');
    });
});
jasmine.execute(['test.js']);
//# sourceMappingURL=test.js.map