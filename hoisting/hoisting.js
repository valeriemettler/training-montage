//Hoisting

//Variable declarations and function declarations are hoisted to the top of their scope.
//Functions are hoisted first, and then variables.
//Variable assignments and function expressions are not hoisted.
//Multiple/duplicate var declarations are ignored, but multiple/duplicate function declarations do override previous ones.

/////////////////////

// Function scope and block scope behave by the same rules: any variable declared within a scope is attached to that scope.

//But there's a subtle detail of how scope attachment works with declarations that appear in various locations within a scope

//Chicken Or The Egg? Which comes first, the declaration ("egg"), or the assignment ("chicken")?

//Example: 
a = 2;

var a;

console.log( a ); //2 because the delcaration var a; gets hoisted

//Example: 
console.log( a );

var a = 2; //undefined, because var a; will be hoisted, but the assignment var a = 2 is not hoisted.

//The Compiler Strikes Again

// The JavaScript Engine will compile your JavaScript code before it interprets it. Part of the compilation phase is to find and associate all declarations with their appropriate scopes, so all declarations, both variables and functions, are processed first, before any part of your code is executed.

// When you see var a = 2;, you probably think of that as one statement. But JavaScript actually thinks of it as two statements: var a; and a = 2;. The first statement, the declaration, is processed during the compilation phase. The second statement, the assignment, is left in place for the execution phase.

// Our first snippet then should be thought of as being handled like this:

var a;
a = 2;

console.log( a );
// ...where the first part is the compilation and the second part is the execution.

// Similarly, our second snippet is actually processed as:

var a;
console.log( a );

a = 2;

// So, one way of thinking, sort of metaphorically, about this process, is that variable and function declarations are "moved" from where they appear in the flow of the code to the top of the code. This gives rise to the name "Hoisting".

// In other words, the egg (declaration) comes before the chicken (assignment).

// Note: Only the declarations themselves are hoisted, while any assignments or other executable logic are left in place. If hoisting were to re-arrange the executable logic of our code, that could wreak havoc.

//Example:
foo();

function foo() {
	console.log( a ); // undefined

	var a = 2;
}

// The function foo's declaration (which in this case includes the implied value of it as an actual function) is hoisted, such that the call on the first line is able to execute.

// It's also important to note that hoisting is per-scope. So while our previous snippets were simplified in that they only included global scope, the foo(..) function we are now examining itself exhibits that var a is hoisted to the top of foo(..) (not, obviously, to the top of the program). So the program can perhaps be more accurately interpreted like this:

function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();

// Function declarations are hoisted, as we just saw. But function expressions are not.

foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
	// ...
};

// The variable identifier foo is hoisted and attached to the enclosing scope (global) of this program, so foo() doesn't fail as a ReferenceError. But foo has no value yet (as it would if it had been a true function declaration instead of expression). So, foo() is attempting to invoke the undefined value, which is a TypeError illegal operation.

// Also recall that even though it's a named function expression, the name identifier is not available in the enclosing scope:

foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
	// ...
};

// This snippet is more accurately interpreted (with hoisting) as:

var foo;

foo(); // TypeError...foo is undefined, and trying to invoke an undefined value throws a TypeError
bar(); // ReferenceError..bar is referenced in the function scope below. This invocation of bar doesn't have access to the functions scope and is therefore a ReferenceError

foo = function() {
	var bar = ...self... // the named function expression's declaration gets hoisted to the top of this function's scope
	// ...
}

//Functions First 

//Functions are hoisted first, and then variables.

// Consider:

foo(); // 1

var foo;

function foo() {
	console.log( 1 );
}

foo = function() {
	console.log( 2 );
};
// 1 is printed instead of 2! This snippet is interpreted by the Engine as:

function foo() {
	console.log( 1 );
}

foo(); // 1

foo = function() {
	console.log( 2 );
};
// Notice that var foo was the duplicate (and thus ignored) declaration, even though it came before the function foo()... declaration, because function declarations are hoisted before normal variables.

// While multiple/duplicate var declarations are effectively ignored, subsequent function declarations do override previous ones.

foo(); // 3

function foo() {
	console.log( 1 );
}

var foo = function() {
	console.log( 2 );
};

function foo() {
	console.log( 3 );
}

// While this all may sound like nothing more than interesting academic trivia, it highlights the fact that duplicate definitions in the same scope are a really bad idea and will often lead to confusing results.

// Function declarations that appear inside of normal blocks typically hoist to the enclosing scope, rather than being conditional as this code implies:

foo(); // "b"

var a = true;
if (a) {
   function foo() { console.log( "a" ); } //this function foo gets hoisted first
}
else {
   function foo() { console.log( "b" ); } //then this function foo gets hoisted and overrides the previous function foo, then foo(); is invoked, which returns "b"
}
// However, it's important to note that this behavior is not reliable and is subject to change in future versions of JavaScript, so it's probably best to avoid declaring functions in blocks.