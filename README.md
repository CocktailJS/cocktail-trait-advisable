[![Build Status](https://travis-ci.org/CocktailJS/cocktail-trait-advisable.svg?branch=master)](https://travis-ci.org/CocktailJS/cocktail-trait-advisable)
[![npm version](https://badge.fury.io/js/cocktail-trait-advisable.svg)](http://badge.fury.io/js/cocktail-trait-advisable)

# cocktail-trait-advisable

## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

A Trait to add AOP advices into Classes/Objects.
The methods `around`, `after` and `before` are available on host classes or objects.

## Install

```bash

npm install cocktail --save
npm install cocktail-trait-advisable --save

```

## Trait requires (glue code)

None.

## Usage

Define a class with advisable trait:

>MyClass.js

```javascript

var cocktail = require('cocktail'),
    advisable = require('cocktail-trait-advisable');

cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    '@traits' : [advisable],

    aMethod: function () {
        console.log('a method is called!');
    }
});


```

And then use it on your index.js

>index.js

```javascript

var MyClass = require('./MyClass');



var obj = new MyClass();

function afterFn() { console.log('this will be called after!'); }

// #1 attach the after advice
obj.after('aMethod', afterFn);


// #2 call the adviced method
obj.aMethod(); 

```

On \#1 we attached the advice for after calling `aMethod` method in our `obj`. Then when \#2 is executed the console output will show:

```bash

node index.js
a method is called
this will be called after!

```

## API

The following methods will be publicly available on the host class:

- `after( methodName, adviceFunction, [scope] )`: Adds the adviceFunction to be called after the method.
    - **methodName** {String}: The method name in the host class.
    - **adviceFunction** {String|Function}: the function or the name of the function to be called. It receives the same parameters as the method.
    - **scope** {Object} the scope to execute the adviceFunction. Optional.
- `before( methodName, adviceFunction, [scope] )`: Adds the adviceFunction to be called before the method.
    - **methodName** {String}: The method name in the host class.
    - **adviceFunction** {String|Function}: the function or the name of the function to be called. It receives the same parameters as the method.
    - **scope** {Object} the scope to execute the adviceFunction. Optional.
- `around( methodName, adviceFunction, [scope] )`: Adds the adviceFunction to be called around the method.
    - **methodName** {String}: The method name in the host class.
    - **adviceFunction** {String|Function}: the function or the name of the function to be called. It receives the method as the first parameter and then same parameters.
    - **scope** {Object} the scope to execute the adviceFunction. Optional.
    
