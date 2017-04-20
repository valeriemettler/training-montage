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
// BUT HARD BINDING, a variation pattern around explicit binding, actually does the trick! See below for example.
//example:


//new Binding
//When a function is invoked with new in front of it, the newly constructed object is set as the 'this' binding for that function call
//example:
function foo(a) {
    this.a = a;
}

var bar = new foo( 2 ); //constructed a new object and set that new object as the 'this' for the call of foo(..).
console.log( bar.a ); // 2 (bar is this, so bar.a = 2)
