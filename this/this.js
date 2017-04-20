//global this returns:
console.log(this); //Window {stop: function, open: function, alert: function, confirm: function, prompt: function…}

//Determining 'this' summary:
// Determining the this binding for an executing function requires finding the direct call-site of that function.
// Once examined, four rules can be applied to the call-site, in this order of precedence:

// Called with new? Use the newly constructed object. (new binding)

// Called with call or apply (or bind)? Use the specified object. (explicit binding)

// Called with a context object owning the call? Use that context object. (implicit binding)

// Default: undefined in strict mode, global object otherwise. (Default binding)

// Be careful of accidental/unintentional invoking of the default binding rule.
// In cases where you want to "safely" ignore a this binding,
// a "DMZ" object ((de-militarized zone object) like ø = Object.create(null) is a good placeholder value that protects the global object from unintended side-effects.

// Instead of the four standard binding rules, ES6 arrow-functions use lexical scoping for this binding,
// which means they adopt the this binding (whatever it is) from its enclosing function call.
// They are essentially a syntactic replacement of the self = this in pre-ES6 coding.

//Default Binding example:
var foo = function() {
    // "use strict"; ---but using this will make this console log return  TypeError: `this` is `undefined`
    console.log( "this in foo", this.a ); //2 because the default binding for this applies to the function call, and so points this at the global object, which is this.a, which is var a, which is a global variable
}

var a = 2;

foo(); //2

//Implicit Binding example:
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2...there is a context object for a function reference, and because obj is the this for the foo() call, this.a is synonymous with obj.a.

//Only the top/last level of an object property reference chain matters to the call-site. For instance:
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42...since obj2 is called after obj1, this.a is obj2.a, which is 42

//Implicitly Lost ** BE CAREFUL!!
//When an implicitly bound function loses it's "this" binding, it falls back to the default binding of being either the global object or undefined (depending on whether or not strict mode was used)
//Example 1:

function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // function reference/alias! : Even though bar appears to be a reference to obj.foo, in fact, it's really just another reference to foo itself.

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global" ..Moreover, the call-site is what matters, and the call-site is bar(), which is a plain, un-decorated call and thus the default binding applies.

//Example 2: The more subtle, more common, and more unexpected way an implicitly bound function loses it's "this" binding is when we consider passing a callback function
//Parameter passing is just an implicit assignment, and since we're passing a function, it's an implicit reference assignment,
// but it falls back to the default binding of being the global object
// this will happen whether you created the callback yourself, or if you're using a built-in callback, like setTimeout
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // `fn` is just another reference to `foo`

    fn(); // <-- call-site!...fn(); here is the same as foo();
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"...obj.foo is var obj, foo, which is the foo function above, so basically doFoo is being passed the function foo(), and then calls foo()
//and foo has this.a, which is the global variable var a which has the value "oops, global"

//Example3:
//Another way that this can surprise us is when the function we've passed our callback to intentionally changes the this for the call.
//Event handlers in popular JavaScript libraries are quite fond of forcing your callback to have a this which points to, for instance, the DOM element that triggered the event.

//Explicit Binding example: use call()  or apply() methods. They both take and object to use for "this" as their first parameter and then invoke the function with that "this".

function choo() {
    console.log("explicit binding!!!", this.a );
}

var obj = {
    a: 2
};

choo.call( obj ); // 2 ...call is given the parameter "obj", and then calls choo. The this.a inside of choo is then obj.a, which is 2

//Unfortunately, explicit binding alone still doesn't offer any solution to a function "losing" its intended this binding, or just having it paved over by a framework, etc.
//Hard binding is one strategy for preventing a function call falling back to the default binding rule inadvertently, by forcing it to be bound to a specific this (unless you use new to override it!).
//The problem is, hard-binding greatly reduces the flexibility of a function, preventing manual this override with either the implicit binding or even subsequent explicit binding attempts.
//Use soft binding  to provide a different default for default binding (not global or undefined), while still leaving the function able to be manually this bound via implicit binding or explicit binding techniques.
//obj2.foo = foo.softBind(obj);
//softBind() wraps the specified function in logic that checks the this at call-time and if it's global or undefined, uses a pre-specified alternate default (obj).
//Otherwise the this is left untouched.
// It also provides optional currying
//example:

function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
//The soft-bound version of the foo() function can be manually this-bound to obj2 or obj3 as shown,
//but it falls back to obj if the default binding would otherwise apply.


//new Binding
//When a function is invoked with new in front of it, the newly constructed object is set as the 'this' binding for that function call
//example:
function foo(a) {
    this.a = a;
}

var bar = new foo( 2 ); //constructed a new object and set that new object as the 'this' for the call of foo(..).
console.log( bar.a ); // 2 (bar is this, so bar.a = 2)


//Lexical this
//Normal functions abide by the 4 rules we just covered.
//But the arrow function in ES6 doesn't use these rules!!
//Arrow-functions are signified not by the function keyword, but by the => so called "fat arrow" operator.
// Instead of using the four standard this rules, arrow-functions adopt the this binding from the enclosing (function or global) scope.
//example of arrow-function lexical scope:

function foo() {
    // return an arrow function
    return (a) => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
//The arrow-function created in foo() lexically captures whatever foo()s this is at its call-time.
// Since foo() was this-bound to obj1, bar (a reference to the returned arrow-function) will also be this-bound to obj1.
//The lexical binding of an arrow-function cannot be overridden (even with new!).
//The most common use-case will likely be in the use of callbacks, such as event handlers or timers:

function foo() {
    setTimeout(() => {
        // `this` here is lexically adopted from `foo()`
        console.log( this.a );
    },100);
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
//While arrow-functions provide an alternative to using bind(..) on a function to ensure its this,
// which can seem attractive, it's important to note that they essentially are disabling the traditional this mechanism in favor of more widely-understood lexical scoping.
// Pre-ES6 example:

function foo() {
    var self = this; // lexical capture of `this`
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

class MyClass {
  constructor(...args: any[]) {
    // always have this
  }

  delayedIntroduction(delay) {
    setTimeout( function() {
      // this === Window in non-strict mode
    }, delay );

    function fnForSetTimeout() {}
    setTimeout(
      fnForSetTimeout(), // this === Window in non-strict mode
      delay
    );
    setTimeout(
      fnForSetTimeout.call(this), // `this` is instance of MyClass
      delay
    );

    setTimeout( (function() {
      // `this` is instance of MyClass
    }).bind(this), delay );

    setTimeout( () => {
      // `this` is instance of MyClass
    }, delay );
  }
}

//In ES6
// Main module
import {SubFunction, MyOtherSubFunction} from './sub-module-01';
import * as SubModule02 from './sub-module-01';

import * as React from 'react';
import { Component } from 'react';

class myComponent extends React.Component {}
class myComponent extends Component {}

// Sub module 1
export function SubFunction () {}
export function MyOtherSubFunction () {}

// Sub module 2
export default () => {}


//// In Node...
// Main module
import {SubFunction} from './sub-module';

// Sub module 1
// strict mode is assumed
export function SubFunction () {
  // this === undefined
  this
}

// jQuery `this` example
// this means { name: 'valerie' }
const self = this;
$('li').each(function(el) { // jQuery.each has the same API ad forEach
  self; // you can access ouside `this`
  this; // a `li` HTMLListElement
  el; // a `li` HTMLListElement
})

(function() {
  this === { name: 'Valerie' };
}).bind({ name: 'Valerie' })

const myData = { name: 'Valerie' };
() => {
  myData;
}

// interface FunctionType {
//   (...args: any[]): any;
// }
// export interface ClassType<T> {
//   new (...args: any[]): T;
// }

var obj = {
    a: 2
};

foo.call( obj ); // 2
//While self = this and arrow-functions both seem like good "solutions" to not wanting to use bind(..), they are essentially fleeing from this instead of understanding and embracing it.
//If you find yourself writing this-style code, but most or all the time, you defeat the this mechanism with lexical self = this or arrow-function "tricks", perhaps you should either:
//1.  Use only lexical scope and forget the false pretense of this-style code. *** QUESTION what is the difference between lexical scope and this-style code??
//2. Embrace this-style mechanisms completely, including using bind(..) where necessary, and try to avoid self = this and arrow-function "lexical this" tricks.
//A program can effectively use both styles of code (lexical and this), but inside of the same function, and indeed for the same sorts of look-ups,
// mixing the two mechanisms is usually asking for harder-to-maintain code, and probably working too hard to be clever.