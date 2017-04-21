//Function vs Block Scope

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

