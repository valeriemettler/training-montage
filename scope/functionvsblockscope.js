//Function vs Block Scope

//Functions and Blocks are units of scope in JavaScript. 
//The try/catch structure has block-scope in the catch clause for ES5.
//ES6 has the let keyword for block-scope. const also creates a block-scoped variable, but whose value is fixed (constant). Any attempt to change that value at a later time results in an error.
//Named function expressions and Immediately Invoked Function Expressions (IFFEs) are good to use to "hide" variables from the global scope

// Anonymous function expressions have several draw-backs to consider:

//1. They have no useful name to display in stack traces, which can make debugging more difficult.

//2. Without a name, if the function needs to refer to itself, for recursion or for when an event handler function wants to unbind itself after it fires, etc., the deprecated arguments.callee reference is unfortunately required.

//3. Anonymous functions omit a name that is often helpful in providing more readable/understandable code.

//function declarations aren't ideal because the identifier name of the function "pollutes" the enclosing scope (which can be the global scope). The function declaration also needs to be explicitly called to make it execute (versus having it execute automatically). 

////////////////////////////////////////////

//summary: 
// Functions are the most common unit of scope in JavaScript. Variables and functions that are declared inside another function are essentially "hidden" from any of the enclosing "scopes", which is an intentional design principle of good software.

// But functions are by no means the only unit of scope. Block-scope refers to the idea that variables and functions can belong to an arbitrary block (generally, any { .. } pair) of code, rather than only to the enclosing function.

// Starting with ES3, the try/catch structure has block-scope in the catch clause.

// In ES6, the let keyword (a cousin to the var keyword) is introduced to allow declarations of variables in any arbitrary block of code. if (..) { let a = 2; } will declare a variable a that essentially hijacks the scope of the if's { .. } block and attaches itself there.

// Though some seem to believe so, block scope should not be taken as an outright replacement of var function scope. Both functionalities co-exist, and developers can and should use both function-scope and block-scope techniques where respectively appropriate to produce better, more readable/maintainable code.



//Scope From Functions
//JavaScript has function-based scope

//Example:
function foo(a) {
	var b = 2;

	// some code

	function bar() {
		// ...
	}

	// more code

	var c = 3;
}

// In this snippet, the scope bubble for foo(..) includes identifiers a, b, c and bar. It doesn't matter where in the scope a declaration appears, the variable or function belongs to the containing scope bubble, regardless.

// bar(..) has its own scope bubble. So does the global scope, which has just one identifier attached to it: foo.

// Because a, b, c, and bar all belong to the scope bubble of foo(..), they are not accessible outside of foo(..). That is, the following code would all result in ReferenceError errors, as the identifiers are not available to the global scope:


bar(); // fails

console.log( a, b, c ); // all 3 fail

// However, all these identifiers (a, b, c, foo, and bar) are accessible inside of foo(..), and indeed also available inside of bar(..) (assuming there are no shadow identifier declarations inside bar(..)).

// Function scope encourages the idea that all variables belong to the function, and can be used and reused throughout the entirety of the function (and indeed, accessible even to nested scopes). This design approach can be quite useful, and certainly can make full use of the "dynamic" nature of JavaScript variables to take on values of different types as needed.

//Hiding variables in function wrappers instead of using global variables:
function doSomething(a) {
	function doSomethingElse(a) {
		return a - 1;
	}

	var b;

	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

doSomething( 2 ); // 15

// Collision Avoidance
// Another benefit of "hiding" variables and functions inside a scope is to avoid unintended collision between two different identifiers with the same name but different intended usages. Collision results often in unexpected overwriting of values.

function foo() {
	function bar(a) {
		i = 3; // changing the `i` in the enclosing scope's for-loop
		console.log( a + i );
	}

	for (var i=0; i<10; i++) {
		bar( i * 2 ); // oops, infinite loop ahead!
	}
}

foo();

// The i = 3 assignment inside of bar(..) overwrites, unexpectedly, the i that was declared in foo(..) at the for-loop. In this case, it will result in an infinite loop, because i is set to a fixed value of 3 and that will forever remain < 10.

// Module Management
// Another option for collision avoidance is the more modern "module" approach, using any of various dependency managers. Using these tools, no libraries ever add any identifiers to the global scope, but are instead required to have their identifier(s) be explicitly imported into another specific scope through usage of the dependency manager's various mechanisms

//Functions As Scopes
//using a wrapper function introduces problems: declaring a named wrapper function "pollutes" the enclosing scope and you have to explicitly call the function by name so it executes. It would be more ideal if the function didn't need a name (or, rather, the name didn't pollute the enclosing scope), and if the function could automatically be executed.

//Fortunately, JavaScript offers a solution to both problems.
var a = 2;

(function foo(){ // <-- insert this

	var a = 3;
	console.log( a ); // 3

})(); // <-- and this

console.log( a ); // 2

//Instead of treating the function as a standard declaration, the function is treated as a function-expression. The name foo is not bound in the enclosing scope, but instead is bound only inside of its own function. In other words, (function foo(){ .. }) as an expression means the identifier foo is found only in the scope where the .. indicates, not in the outer scope. Hiding the name foo inside itself means it does not pollute the enclosing scope unnecessarily.

//Note: The easiest way to distinguish declaration vs. expression is the position of the word "function" in the statement (not just a line, but a distinct statement). If "function" is the very first thing in the statement, then it's a function declaration. Otherwise, it's a function expression. (including a paren!)

//Anonymous vs. Named
//You are probably most familiar with function expressions as callback parameters, such as:

setTimeout( function(){
	console.log("I waited 1 second!");
}, 1000 );

//This is called an "anonymous function expression", because function()... has no name identifier on it. Function expressions can be anonymous, but function declarations cannot omit the name -- that would be illegal JS grammar.

// Anonymous function expressions are quick and easy to type, and many libraries and tools tend to encourage this idiomatic style of code. However, they have several draw-backs to consider:

//1. Anonymous functions have no useful name to display in stack traces, which can make debugging more difficult.

//2. Without a name, if the function needs to refer to itself, for recursion, etc., the deprecated arguments.callee reference is unfortunately required. Another example of needing to self-reference is when an event handler function wants to unbind itself after it fires.

//3. Anonymous functions omit a name that is often helpful in providing more readable/understandable code. A descriptive name helps self-document the code in question.

// Inline function expressions are powerful and useful -- the question of anonymous vs. named doesn't detract from that. Providing a name for your function expression quite effectively addresses all these draw-backs, but has no tangible downsides. The best practice is to always name your function expressions:

setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
	console.log( "I waited 1 second!" );
}, 1000 );

//Invoking Function Expressions Immediately
// Now that we have a function as an expression by virtue of wrapping it in a ( ) pair, we can execute that function by adding another () on the end, like (function foo(){ .. })(). The first enclosing ( ) pair makes the function an expression, and the second () executes the function.

// This pattern is so common, a few years ago the community agreed on a term for it: IIFE, which stands for Immediately Invoked Function Expression.

// Of course, IIFE's don't need names, necessarily -- the most common form of IIFE is to use an anonymous function expression. While certainly less common, naming an IIFE has all the aforementioned benefits over anonymous function expressions, so it's a good practice to adopt.

var a = 2;

(function IIFE(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2

// There's a slight variation on the traditional IIFE form, which some prefer: (function(){ .. }()). Look closely to see the difference. In the first form, the function expression is wrapped in ( ), and then the invoking () pair is on the outside right after it. In the second form, the invoking () pair is moved to the inside of the outer ( ) wrapping pair.

// These two forms are identical in functionality. It's purely a stylistic choice which you prefer.

// Another variation on IIFE's which is quite common is to use the fact that they are, in fact, just function calls, and pass in argument(s).

// example:

var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window );

console.log( a ); // 2

// Another application of this pattern addresses the (minor niche) concern that the default undefined identifier might have its value incorrectly overwritten, causing unexpected results. By naming a parameter undefined, but not passing any value for that argument, we can guarantee that the undefined identifier is in fact the undefined value in a block of code: ???

undefined = true; // setting a land-mine for other code! avoid!

(function IIFE( undefined ){

	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	}

})();

// Still another variation of the IIFE inverts the order of things, where the function to execute is given second, after the invocation and parameters to pass to it. This pattern is used in the UMD (Universal Module Definition) project. Some people find it a little cleaner to understand, though it is slightly more verbose.

var a = 2;

(function IIFE( def ){
	def( window );
})(function def( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

});

// The def function expression is defined in the second-half of the snippet, and then passed as a parameter (also called def) to the IIFE function defined in the first half of the snippet. Finally, the parameter def (the function) is invoked, passing window in as the global parameter.

//Blocks As Scopes
// While functions are the most common unit of scope, and certainly the most wide-spread of the design approaches in the majority of JS in circulation, other units of scope are possible, and the usage of these other scope units can lead to even better, cleaner to maintain code.

// block-scoping is declaring variables as close as possible, as local as possible, to where they will be used. 
//example:
var foo = true;

if (foo) {
	var bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}

// We are using a bar variable only in the context of the if-statement, so it makes a kind of sense that we would declare it inside the if-block. However, where we declare variables is not relevant when using var, because they will always belong to the enclosing scope.

// But, the sad reality is that, on the surface, JavaScript has no facility for block scope. That is, until you dig a little further.

// try/catch

// JavaScript in ES3 specified the variable declaration in the catch clause of a try/catch to be block-scoped to the catch block.

// Example:

try {
	undefined(); // illegal operation to force an exception!
}
catch (err) {
	console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found

// As you can see, err exists only in the catch clause, and throws an error when you try to reference it elsewhere.

// Note: While this behavior has been specified and true of practically all standard JS environments (except perhaps old IE), many linters seem to still complain if you have two or more catch clauses in the same scope which each declare their error variable with the same identifier name. This is not actually a re-definition, since the variables are safely block-scoped, but the linters still seem to, annoyingly, complain about this fact.

// To avoid these unnecessary warnings, some devs will name their catch variables err1, err2, etc. Other devs will simply turn off the linting check for duplicate variable names.

//let in ES6 finally gives full, unfettered block-scoping capability to our code. 

//Example:
{
	let a = 2;
	console.log( a ); // 2
}

console.log( a ); // ReferenceError

//But pre-ES6 we can do: 
try{throw 2}catch(a){
	console.log( a ); // 2
}

console.log( a ); // ReferenceError

// try/catch throws an error, but the "error" it throws is just a value 2, and then the variable declaration that receives it is in the catch(a) clause, so catch clause has block-scoping to it, which means it can be used as a polyfill for block scope in pre-ES6 environments.


//let

// The let keyword attaches the variable declaration to the scope of whatever block (commonly a { .. } pair) it's contained in. 

//example: 
var foo = true;

if (foo) {
	let bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}

console.log( bar ); // ReferenceError

// Using let to attach a variable to an existing block is somewhat implicit. It can confuse you if you're not paying close attention to which blocks have variables scoped to them, and are in the habit of moving blocks around, wrapping them in other blocks, etc., as you develop and evolve code.

// Creating explicit blocks for block-scoping can address some of these concerns, making it more obvious where variables are attached and not. Usually, explicit code is preferable over implicit or subtle code. This explicit block-scoping style is easy to achieve, and fits more naturally with how block-scoping works in other languages:

var foo = true;

if (foo) {
	{ // <-- explicit block
		let bar = foo * 2;
		bar = something( bar );
		console.log( bar );
	}
}

console.log( bar ); // ReferenceError

// We can create an arbitrary block for let to bind to by simply including a { .. } pair anywhere a statement is valid grammar. In this case, we've made an explicit block inside the if-statement, which may be easier as a whole block to move around later in refactoring, without affecting the position and semantics of the enclosing if-statement.

//Note on hoisting with let: declarations made with let will not hoist to the entire scope of the block they appear in. Such declarations will not observably "exist" in the block until the declaration statement.

//example:
{
   console.log( bar ); // ReferenceError!
   let bar = 2;
}

//garbage collection
// Block scoping can help with garbage collection, by making it clearer to the engine that it does not need to keep
//example:
function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after!
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );

//let Loops
//example:
for (let i=0; i<10; i++) {
	console.log( i );
}

console.log( i ); // ReferenceError

// Not only does let in the for-loop header bind the i to the for-loop body, but in fact, it re-binds it to each iteration of the loop, making sure to re-assign it the value from the end of the previous loop iteration.

// Here's another way of illustrating the per-iteration binding behavior that occurs:

{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}

// The reason why this per-iteration binding is interesting will become clear in Chapter 5 when we discuss closures.

// Because let declarations attach to arbitrary blocks rather than to the enclosing function's scope (or global), there can be gotchas where existing code has a hidden reliance on function-scoped var declarations, and replacing the var with let may require additional care when refactoring code.

// Consider:

var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	if (baz > bar) {
		console.log( baz );
	}

	// ...
}
// This code is fairly easily re-factored as:

var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	// ...
}

if (baz > bar) {
	console.log( baz );
}
// But, be careful of such changes when using block-scoped variables: bar is now scoped to the let block and you cannot move it out of that block without losing access to bar

var foo = true, baz = 10;

if (foo) {
	let bar = 3;

	if (baz > bar) { // <-- don't forget `bar` when moving!
		console.log( baz );
	}
}



// const

// In addition to let, ES6 introduces const, which also creates a block-scoped variable, but whose value is fixed (constant). Any attempt to change that value at a later time results in an error.
var foo = true;

if (foo) {
	var a = 2;
	const b = 3; // block-scoped to the containing `if`

	a = 3; // just fine!
	b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!