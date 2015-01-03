# __Underscore-Angularized__ 
## _[AngularJS](http://angularjs.org/) wrapper for  [Underscore](http://underscorejs.org/)_

## What is it?
Underscore is a fantastic JavaScript library and it's an invaluable tool for web developers. I made this wrapper to solve two particular issues for Angular developers.
* __Underscore is now fully in the Angular digest lifecycle__: Underscore provides a number of asynchronous functions that falls outside of the angular lifecycle and it's up to you to manage it with manual `$scope.$apply()` calls. (`_.throttle` and `_.debounce` as examples) You can now use any function provided by Underscore and it will be in the angular lifecycle.
* __It's now off the global scope__: Angular provides an excellent Dependency Injection system and Underscore is now an injectable service. This keeps it off the global namespace and helps with unit testing.

The only part of Underscore that's been modified is that all `setTimeout` and `clearTimeout` calls have been respectively replaced with `$timeout` and `$timeout.cancel()`. __Besides those changes it's 100% stock Underscore__.


## Dependencies
`AngularJS` : 1.2+ (It's possible this will work on older versions of Angular . Older versions of Angular have not been tested and it's not currently supported.)

## Installation

Project files are also available through Bower  

```bash
bower install underscore-angularized
```

or [GitHub](https://github.com/ng-angularized/underscore-angularized):

```
git clone https://github.com/ng-angularized/underscore-angularized.git
```


Then load the module into your main module.

```javascript
angular.module('myModule', ['underscore-angularized']);
```

## Usage
To use underscore, just load it as a dependency into your module.

```javascript
angular.module('myModule').controller('myController', ['underscore', function(_){
    //Use Underscore here...
}])
```

## Supported browsers

Directives from this repository are automatically tested with the following browsers:
* Chrome 
* Firefox
* IE 9+
* Opera
* Safari

Modern mobile browsers should work without problems.

### Tests (using PhantomJS)
Install Dependencies for Testing
* Install [Node.js](http://nodejs.org/) and NPM 
* Install local dev dependencies: `npm install` while current directory is underscore-angularized repo

Run the tests
* Run Default test: `grunt run test` 

### Browser Based Tests

* Run Chrome tests: `grunt run test-chrome`
* Run Firefox tests: `grunt run test-firefox`
* Run IE tests: `grunt run test-ie` 

##### __NOTE__: _The tests are split apart to ensure it always runs in PhantomJS. If you want to test in a particular browser, just run that test!_


