//Mutable and immutable data structures

//A mutable object is an object whose state can be modified after it is created.
//Mutable objects are nice because you can make changes "in-place," without allocating a new object. But be careful—whenever you make an in-place change to an object, all references to that object will now reflect the change (whether you like it or not)!

//An immutable object is an object whose state cannot be modified after it is created. 

//Numbers and strings are native JavaScript values that are immutable. All primitive values are immutable (any data that is not an object and has no methods): there are 6 primitive data types: string, number, boolean, null, undefined, symbol (new in ECMAScript 2015).

//Objects, arrays, functions, classes, sets, and maps are native JavaScript values that are mutable.

//For mutable values, updating state applies across all references to that variable. So changing a value in one place, changes it for all references to that object. 

//For the immutable data types, we have no way of changing the internal state of the data, so the reference always gets reassigned to a new object.

//The biggest implication of this is that for immutable data, equality is more reliable since we know that a value’s state won’t be changed out from under us.???

//It’s still possible to treat JavaScript objects as immutable. This can first be done through Object.freeze, which shallowly renders a JavaScript object immutable.
//It can also be done by enforcing that all object updates are done through something like Object.assign(a, {foo: 'bar'}) rather than a.foo = 'bar', and all array updates are done through functions that generate new arrays like Array.prototype.map, Array.prototype.filter, or Array.prototype.concat, rather than mutating methods like Array.prototype.push, Array.prototye.pop, or Array.prototype.sort. This is less reliable without language level constraints (???), but has become popular in the React ecosystem for dealing with data for folks who don’t want to introduce abstractions like Immutable.js (written by developers at Facebook).

//Object mutability example: 
let a = {
    foo: 'bar'
};

let b = a;

a.foo = 'test';

console.log("b.foo", b.foo); // test
console.log("a === b", a === b) // true


//String immutibility example: 
let c = 'test';
let d = c; //d reference gets assigned to a new object (basically, a new string was created), because strings are immutable and we have no way of changing the internal state of the data
c = c.substring(2); //returns the last 2 characters in the string

console.log("c", c) //st
console.log("d", d) //test
console.log("c === d", c === d) //false

//String immutibility example:  
let testString = 'mutable?';
testString[7] = '!';
console.log("testString", testString);
// string is still 'mutable?'
// (but no error is raised!)

//Object mutability example
let e = ['foo', 'bar'];
let f = e; 

e.push('baz')//whenever you make an in-place change to an object, all references to that object (e and f in this case) will now reflect the change

console.log("f", f); // ['foo', 'bar', 'baz']
console.log("e", e); // ['foo', 'bar', 'baz']
console.log("e === f", e === f) // true

//Number immutability example
let g = 1;
let h = g;//h reference gets assigned to a new object (basically, a new number was created), because numbers are immutable and we have no way of changing the internal state of the data
g++; // g = g + 1 

console.log("g", g) //2
console.log("h", h) //1
console.log("g === h", g === h) //false


//Example of using Object.freeze() to make an object immutable
var obj = {
  prop: function() {},
  foo: 'bar'
};

// New properties may be added, existing properties may be
// changed or removed
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// Both the object being passed as well as the returned
// object will be frozen. It is unnecessary to save the
// returned object in order to freeze the original.
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true

// Now any changes will fail
obj.foo = 'quux'; // silently does nothing
// silently doesn't add the property
obj.quaxxor = 'the friendly duck';

// In strict mode such attempts will throw TypeErrors
function fail(){
  'use strict';
  obj.foo = 'sparky'; // throws a TypeError
  delete obj.quaxxor; // throws a TypeError
  obj.sparky = 'arf'; // throws a TypeError
}

fail();

// Attempted changes through Object.defineProperty will
// also throw. Both statements below throw a TypeError.
Object.defineProperty(obj, 'ohai', { value: 17 });
Object.defineProperty(obj, 'foo', { value: 'eit' });

//The object being frozen is immutable.  However, it is not necessarily constant. The following example shows that a frozen object is not constant (freeze is shallow).

obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

obj1.internal.a // 'aValue'

// To be a constant object, the entire reference graph (direct and indirect references to other objects) must reference only immutable frozen objects.  The object being frozen is said to be immutable because the entire object state (values and references to other objects) within the whole object is fixed.  Note that strings, numbers, and booleans are always immutable and that Functions and Arrays are objects. 

// To make an object constant, recursively freeze each property which is of type object (deep freeze).  Use the pattern on a case-by-case basis based on your design when you know the object contains no cycles in the reference graph, otherwise an endless loop will be triggered.   An enhancement to deepFreeze() would be to have an internal function that receives a path (e.g. an Array) argument so you can supress calling deepFreeze() recursively when an object is in the process of being made constant.  You still run a risk of freezing an object that shouldn't be frozen, such as [window].

// To do so, we use this function.
function deepFreeze(obj) {

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined

// In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError. In ES2015, a non-object argument will be treated as if it were a frozen ordinary object, and be simply returned.

Object.freeze(1)
//TypeError: 1 is not an object // ES5 code

Object.freeze(1)
//1                             // ES2015 code