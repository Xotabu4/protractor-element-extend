/** @internal */
}
class TestFragment extends index_1.BaseFragment {
    constructor(elem) {
        super(elem);
    }
}
<<<<<<< HEAD
class TestArrayFragment extends index_1.BaseArrayFragment {
    constructor(elementArrayFinder) {
        super(elementArrayFinder, TestFragment);
    }
}
///////////////////////////////////////////////////
describe('BaseFragment', () => {
    let testFrag;
    beforeEach(function () {
        testFrag = new TestFragment($('html'));
    });
    it('should still be ElementFinder', function () {
        expect(testFrag instanceof protractor_1.ElementFinder).toBeTruthy("Fragment still should be ElementFinder");
    });
});
describe('BaseArrayFragment', () => {
    let arrayFrag;
    beforeEach(function () {
        arrayFrag = new TestArrayFragment($$('html'));
    });
    it('should still be ElementFinder', function () {
        expect(arrayFrag instanceof protractor_1.ElementArrayFinder).toBeTruthy("BaseArrayFragment should still be ElementArrayFinder");
    });
    it(' ".map()" function must iterate thru your custom elements, not ElementFinders', () => {
        arrayFrag.map(customel => {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating");
        });
    });
    it(' ".each()" must iterate thru your custom elements, not ElementFinders', () => {
        arrayFrag.each(customel => {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating");
        });
    });
    it(' ".filter()" must iterate thru your custom elements, not ElementFinders', (done) => {
        arrayFrag.filter(customel => {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating");
        }).then(done);
    });
    it(' ".filter()" must return your extended from ElementArrayFinder type', (done) => {
        let filteredRes = arrayFrag.filter(() => true);
        expect(filteredRes instanceof TestArrayFragment).toBeTruthy();
        done();
    });
    it(' ".reduce()" must iterate thru your custom elements, not ElementFinders', (done) => {
        arrayFrag.reduce((value, customel) => {
            expect(customel instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while iterating");
        }).then(done);
    });
    it(' ".get()" must return custom element, not ElementFinder', () => {
        expect(arrayFrag.get(0) instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'get' ");
        expect(arrayFrag.first() instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'first' ");
        expect(arrayFrag.last() instanceof TestFragment).toBeTruthy("You should get custom elements, not ElementFinder while calling 'last' ");
=======
describe('BaseFragment', function () {
    let testFrag;
    beforeAll(function () {
        testFrag = new TestFragment($('html'));
    });
    it('should still be ElementFinder', function () {
        expect(testFrag instanceof protractor_1.ElementFinder).toBe(true, "Fragment still should be ElementFinder");
        expect(testFrag.locator()).toBe('html', 'Locator must be saved');
>>>>>>> master
    });
});
jasmine.execute(['test.js']);
//# sourceMappingURL=test.js.map