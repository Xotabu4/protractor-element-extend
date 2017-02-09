# Protractor Fragments
Simple module, that helps you build your own fragments, that are still ElementFinder objects, that brings awesome posibilities to your tests.

===================================
[![Build Status](https://travis-ci.org/Xotabu4/protractor-element-extend.svg?branch=master)](https://travis-ci.org/Xotabu4/protractor-element-extend)


Supported versions
---------------------
Currently tested on 
NodeJS:
- 6.x
- 7.x


ProtractorJS:
- 5.x

Unfortunately, cannot support versions lower that 6, since protractor 5.x does not support them. But this lib should work on protractor 4.x without modifications. Protractor 3.x will require parameter rename. PRs are welcome!

Typings for TypeScript are included.

Installing
---------------------

```
npm install protractor-element-extend --save-dev
```

Notice, that this lib works only if you have protractor in your project dependencies, i didn't include it in lib dependencies to not override your protractor version, wich might be different.


Importing
----------------------
JS:
`let BaseFragment = require('protractor-element-extend').BaseFragment`

TS:
`import {BaseFragment} from 'protractor-element-extend'`


Usage
----------------------
Main purpose of this library, is to allow easily create your own page fragments, which are still will be valid ElementFinders.

To declare your own fragment, declare your class, extend it from BaseFragment, and pass ElementFinder(WebElement) that represents this fragment to super constructor.

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
        // Notice that because your element is valid ElementFinder - you can pass it as parameter to ExpectedConditions!
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

Usage
----------------------

You can wrap any ElementFinder into your fragment:
```typescript
let checkbox = new Checbox($$('.checkbox').last())
```

You can use your elements inside `browser.wait`
```typescript
browser.wait(EC.elementToBeClickable(checkbox), 5000, 'Checkbox should be clickable')
```

You can override default methods, to get even more powerful waits!
```typescript
...
import {promise} from 'protractor'

class Checkbox extends BaseFragment {
  ...
  
  isDisplayed() {
    let fragmentDisplayed = super.isDisplayed()
    let loaderDisplayed = $('.loader').isDispayed()
    // This will return promise, that will be resolved to true, if element is displayed, but loader is not displayed.
    return promise.all(fragmentDisplayed, loaderDisplayed).then(displArray=> displArray[0] && !displArray[1])
  }
}

...
let checkbox = new Checbox($('.checkbox'))
browser.wait(EC.visibilityOf(checkbox), 3000, 'Checkbox should be visible, but loader should not be visible')
```

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

Future
----------------------

- Add possibility to extend `ElementArrayFinder`, this should be in syntax something like this:
```typescript
let searchResults = new SearchResults($$('.result'))
searchResult.get(2) //returns object with SearchResult type, not ElementFinder
...
```
  First experiments shows that protractor still has issue with `.map()` function, You can see first experiments in branch @2.0.0

- Better logging for fragments. Provide possibility to set `name` attribute, and if it is not set - try to generate best we can with `locator()`
 
