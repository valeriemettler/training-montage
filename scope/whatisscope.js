//What is Scope?

//Scope is the set of rules that determines where and how a variable can be looked-up.
//The look-up can be for assigning to the variable, which is an LHS (left-hand-side) reference, or for retrieving its value, which is an RHS (right-hand-side) reference. LHS references from assignment operations can happen either with the = operator or by passing arguments to (assign to) function parameters. 

// Look-ups start at the currently executing Scope, and if they don't find what they're looking for there, they work their way up the nested Scope, one scope at a time, looking for the variable, until they get to the global scope and stop, and either find it, or don't.

// Unfulfilled RHS references result in ReferenceErrors being thrown. Unfulfilled LHS references result in an automatic, implicitly-created global variable of that name (if not in "Strict Mode"), or a ReferenceError (if in "Strict Mode").

///////////////////////////////

// Scope is the set of rules that determines where and how a variable (identifier) can be looked-up. This look-up may be for the purposes of assigning to the variable, which is an LHS (left-hand-side) reference, or it may be for the purposes of retrieving its value, which is an RHS (right-hand-side) reference.

// LHS references result from assignment operations. Scope-related assignments can occur either with the = operator or by passing arguments to (assign to) function parameters.

// The JavaScript Engine first compiles code before it executes, and in so doing, it splits up statements like var a = 2; into two separate steps:

// First, var a to declare it in that Scope. This is performed at the beginning, before code execution.

// Later, a = 2 to look up the variable (LHS reference) and assign to it if found.

// Both LHS and RHS reference look-ups start at the currently executing Scope, and if need be (that is, they don't find what they're looking for there), they work their way up the nested Scope, one scope (floor) at a time, looking for the identifier, until they get to the global (top floor) and stop, and either find it, or don't.

// Unfulfilled RHS references result in ReferenceErrors being thrown. Unfulfilled LHS references result in an automatic, implicitly-created global variable of that name (if not in "Strict Mode" [^note-strictmode]), or a ReferenceError (if in "Strict Mode" [^note-strictmode]).


// Nested Scope
//There's usually more than one Scope to consider. Scopes are nested inside other scopes. So, if a variable cannot be found in the immediate scope, Engine consults the next outer containing scope, continuing until found or until the outermost (aka, global) scope has been reached.

//Example
function foo(a) {
	console.log( a + b );
}

var b = 2;

foo( 2 ); // 4
// The RHS reference for b cannot be resolved inside the function foo, but it can be resolved in the Scope surrounding it (in this case, the global).

// Here's a conversation between Engine and Scope:
// Engine: "Hey, Scope of foo, ever heard of b? Got an RHS reference for it."
// Scope: "Nope, never heard of it. Go fish."
// Engine: "Hey, Scope outside of foo, oh you're the global Scope, ok cool. Ever heard of b? Got an RHS reference for it."
// Scope: "Yep, sure have. Here ya go."

// The simple rules for traversing nested Scope: Engine starts at the currently executing Scope, looks for the variable there, then if not found, keeps going up one level, and so on. If the outermost global scope is reached, the search stops, whether it finds the variable or not.


//LHS and RHS lookups: "Left-hand Side" and "Right-hand Side".
//LHS look-up is trying to find the variable container itself, so that it can assign.
//RHS means "retrieve his/her source (value)", implying that RHS means "go get the value of...". (or "not left-hand side" as it is simply a look-up of the value of some variable).
//These two types of look-ups behave differently in the circumstance where the variable has not yet been declared (is not found in any consulted Scope).

//Example: 
function foo(a) {
	console.log( a + b );
	b = a;
}

foo( 2 );

// When the RHS look-up occurs for b the first time, it will not be found. This is said to be an "undeclared" variable, because it is not found in the scope.

// If an RHS look-up fails to ever find a variable, anywhere in the nested Scopes, this results in a ReferenceError being thrown by the Engine. It's important to note that the error is of the type ReferenceError.

// By contrast, if the Engine is performing an LHS look-up and arrives at the top floor (global Scope) without finding it, and if the program is not running in "Strict Mode" [^note-strictmode], then the global Scope will create a new variable of that name in the global scope, and hand it back to Engine.

// "No, there wasn't one before, but I was helpful and created one for you."

// "Strict Mode" [^note-strictmode], which was added in ES5, has a number of different behaviors from normal/relaxed/lazy mode. One such behavior is that it disallows the automatic/implicit global variable creation. In that case, there would be no global Scope'd variable to hand back from an LHS look-up, and Engine would throw a ReferenceError similarly to the RHS case.

// Now, if a variable is found for an RHS look-up, but you try to do something with its value that is impossible, such as trying to execute-as-function a non-function value, or reference a property on a null or undefined value, then Engine throws a different kind of error, called a TypeError.

// ReferenceError is Scope resolution-failure related, whereas TypeError implies that Scope resolution was successful, but that there was an illegal/impossible action attempted against the result.

function foo(a) {
	var b = a;
	return a + b;
}

var c = foo( 2 );
// Identify all the LHS look-ups (there are 3!).
// c = .., a = 2 (implicit param assignment) and b = ..

// Identify all the RHS look-ups (there are 4!).
// foo(2.., = a;, a + .. and .. + b
