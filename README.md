[![Build Status](https://travis-ci.org/Xotabu4/protractor-element-extend.svg?branch=master)](https://travis-ci.org/Xotabu4/protractor-element-extend)[![Join the chat at https://gitter.im/protractor-element-extend/Lobby](https://badges.gitter.im/protractor-element-extend/Lobby.svg)](https://gitter.im/protractor-element-extend/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
# Protractor Page Fragments

Simple module, that helps you build your own page fragments, that are inherited from ElementFinder/ElementArrayFinder objects, that brings awesome posibilities to your ProtractorJS tests.

You might heard other names for this pattern: Page Components, Page Composition, HTML Elements, Custom WebElements, WebElement inheritance, Page Elements. This is all about the same.

Installing
---------------------
As any other NPM package:
```
npm install protractor-element-extend --save-dev
```

Importing
----------------------
JS:

`let BaseFragment = require('protractor-element-extend').BaseFragment`

`let BaseArrayFragment = require('protractor-element-extend').BaseArrayFragment`

TS:
`import {BaseFragment, BaseArrayFragment} from 'protractor-element-extend'`


Creating own single fragment
----------------------

To declare your own fragment, declare your class, extend it from BaseFragment, and pass ElementFinder(WebElement in protractorJS) that represents this fragment to super constructor.

Here is example how Checkbox fragment can be declared:
```typescript
import {BaseFragment} from 'protractor-element-extend'
import {browser, ExpectedConditions as EC} from 'protractor'

class Checkbox extends BaseFragment {
  constructor(element) {
    super(element) //that's it! now your 'this' reference, is reference to element passed to super constructor
  }
  
  //You can extend it with any methods that you what, and use internal reference to your element
  select() {
    this.isSelected().then(selected => {
      if(!selected) {
        this.click()
        // Notice that because your element is valid ElementFinder - you can pass it as parameter to ExpectedConditions.
        browser.wait(EC.elementToBeSelected(this), 5000, `Checkbox ${this.locator()} must became selected after click, but it wasn't`)
      } else {
          console.warn(`Checkbox ${this.locator()} was already selected, skipping select`)
      }
    })
  }
  
  unselect() {
    this.isSelected().then(selected => {
      if(selected) {
        this.click()
        // Notice that because your element is valid ElementFinder - you can pass it as parameter to ExpectedConditions!
        browser.wait(EC.not(EC.elementToBeSelected(this)), 5000, `Checkbox ${this.locator()} must became unselected after click, but it wasn't`)
      } else {
          console.warn(`Checkbox ${this.locator()} was already unselected, skipping unselect`)
      }
    })
  }

}
```
Creating own collection of custom fragments
----------------------
Often needed to work with own custom collection of own fragments, not only single fragment. For this purpose BaseArrayFragment is added. This object extends ElementArrayFragment, and overrides methods that return single elements, to return your custom fragments. `.map() .filter() .reduce() .each()` and other will receive your custom fragment as parameter as well.

Here is example how SearchResultsCollection fragment can be declared:
```typescript
import { BaseArrayFragment, BaseFragment } from 'protractor-element-extend'
import { browser, ExpectedConditions as EC, $$ } from 'protractor'

// Describing single search result on our page. Notice that constructor declaration could be skipped, in this case constructor from BaseFragment will be used
class SearchResult extends BaseFragment {

    isDiscounted() {
        return this.$('.discount-label').isDisplayed()
    }

    open() {
        this.$('button.open').click()
    }
}

// Generics - <SearchResults> are needs to be defined to provide typings support.
class SearchResultsCollection extends BaseArrayFragment<SearchResult> {
    constructor(elementsToExtend: ElementArrayFinder) {
        // You should pass ElementArrayFinder into super constructor, and constructor(class) that will be used to wrap each element in your collection
        super(elementsToExtend, SearchResult);
    }

    findResultsWithDiscount() {
        // This will return new SearchResults object with only those SearchResult objects that has isDiscounted == true
        return this.filter(searchRes => searchRes.isDiscounted())
    }
}

// Initializing is the same as BaseFragment, but you need to pass ElementArrayFinder now.
let searchResults = new SearchResultsCollection($$('.search-result'))
// Awesome readability for your tests
searchResults.findResultsWithDiscount().first().open()
```

More tricks
----------------------

You can wrap any ElementFinder into your fragment:
```typescript
let checkbox = new Checkbox($$('.checkbox').last())
```
--------------------------------
You can use your fragments everywhere where ElementFinder is expected. For example - inside `browser.wait`
```typescript
browser.wait(EC.elementToBeClickable(checkbox), 5000, 'Checkbox should be clickable')
```
Or inside `executeScript`:
```typescript
let checkbox = new Checkbox($('div.checkbox'))
var tag = browser.executeScript('return arguments[0].tagName', checkbox);
expect(tag).toEqual('div');
```
--------------------------------
You can override ElementFinder or ElementArrayFinder methods, to get even more powerful functionality
```typescript
...
import {promise} from 'protractor'

class Checkbox extends BaseFragment {
  ...
  // Ovveriding isDisplayed function that is used in ExpectedCondition.visibilityOf()
  isDisplayed() {
    let fragmentDisplayed = super.isDisplayed()
    let loaderDisplayed = $('.loader').isDispayed()
    // This will return promise, that will be resolved to true, if element is displayed, but loader is not displayed.
    return promise.all(fragmentDisplayed, loaderDisplayed).then(displArray=> displArray[0] && !displArray[1])
  }
}

...
let checkbox = new Checkbox($('.checkbox'))
browser.wait(EC.visibilityOf(checkbox), 3000, 'Checkbox should be visible, but loader should not be visible')
```
--------------------------------
Try to use fragments by placing fragments one into another:
```typescript
class LoginForm extends BaseFragment {
    loginField:TextField
    passwordField:TextField
    rememberMe:Checkbox

    constructor() {
        super($('.loginform'))
        // Notice that we are searching only inside 'this' element, this brings additional stability to tests
        this.loginField = new TextField(this.$('.loginfield'))
        this.passwordField = new TextField(this.$('.passwordfield'))
        this.rememberMe = new Checkbox(this.$('.rememberme'))
    }

    login(username='test', password='test', rememberme=true) {
        this.loginField.type(username)
        this.passwordField.type(password)
        rememberme && this.rememberMe.select()
        this.$('button.login').click()
    }
}
```

Supported versions
---------------------
Currently tested on 
NodeJS:
- 6.x
- 7.x

ProtractorJS:
- 5.x

This lib should work on protractor 4.x without modifications (but this is untested). Protractor 3.x will require `browser_` reference rename. PRs are welcome!

Typings for TypeScript are included.


Future
----------------------

- Better logging for fragments. Provide possibility to set `name` attribute, and if it is not set - try to generate best we can with `locator()` 
- Want some feature? Feel free to create issue!


Something to read
----------------------

Source code for ElementFinder and ElementArrayFinder - 

https://github.com/angular/protractor/blob/master/lib/element.ts

Generics in TypeScript - 

https://www.typescriptlang.org/docs/handbook/generics.html

