//Lexical Scope

// There are two predominant models for how scope works. The first of these is by far the most common, used by the vast majority of programming languages. It's called Lexical Scope, which is the scope model that JavaScript employs.

//Lex-time
//The first traditional phase of a standard language compiler is called lexing (aka, tokenizing). The lexing process examines a string of source code characters, breaking up a string of characters into meaningful (to the language) chunks, called tokens, and assigns semantic meaning to the tokens as a result of some stateful parsing. It is this concept which provides the foundation to understand what lexical scope is and where the name comes from. Lexical scope is scope that is defined at lexing time. In other words, lexical scope is based on where variables and blocks of scope are authored, by you, at write time, and thus is (mostly) set in stone by the time the lexer processes your code.

//Example:
function foo(a) {

	var b = a * 2;

	function bar(c) {
		console.log( a, b, c );
	}

	bar(b * 3);
}

foo( 2 ); // 2 4 12

// There are three nested scopes inherent in this code example. 
// 1 encompasses the global scope, and has just one identifier in it: foo.
// 2 encompasses the scope of foo, which includes the three identifiers: a, bar and b.
// 3 encompasses the scope of bar, and it includes just one identifier: c.


// Look-ups

// The structure and relative placement of these scope bubbles fully explains to the Engine all the places it needs to look to find an identifier.

// In the above code snippet, the Engine executes the console.log(..) statement and goes looking for the three referenced variables a, b, and c. It first starts with the innermost scope bubble, the scope of the bar(..) function. It won't find a there, so it goes up one level, out to the next nearest scope bubble, the scope of foo(..). It finds a there, and so it uses that a. Same thing for b. But c, it does find inside of bar(..).

// Had there been a c both inside of bar(..) and inside of foo(..), the console.log(..) statement would have found and used the one in bar(..), never getting to the one in foo(..).

// Scope look-up stops once it finds the first match. The same identifier name can be specified at multiple layers of nested scope, which is called "shadowing" (the inner identifier "shadows" the outer identifier). Regardless of shadowing, scope look-up always starts at the innermost scope being executed at the time, and works its way outward/upward until the first match, and stops.

// Note: Global variables are also automatically properties of the global object (window in browsers, etc.), so it is possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object.

// window.a
// This technique gives access to a global variable which would otherwise be inaccessible due to it being shadowed. However, non-global shadowed variables cannot be accessed.

// No matter where a function is invoked from, or even how it is invoked, its lexical scope is only defined by where the function was declared.

// The lexical scope look-up process only applies to first-class identifiers, such as the a, b, and c. If you had a reference to foo.bar.baz in a piece of code, the lexical scope look-up would apply to finding the foo identifier, but once it locates that variable, object property-access rules take over to resolve the bar and baz properties, respectively.

// Two mechanisms in JavaScript can "cheat" lexical scope: eval(..) and with. The former can modify existing lexical scope (at runtime) by evaluating a string of "code" which has one or more declarations in it. The latter essentially creates a whole new lexical scope (again, at runtime) by treating an object reference as a "scope" and that object's properties as scoped identifiers.

// The downside to these mechanisms is that it defeats the Engine's ability to perform compile-time optimizations regarding scope look-up, because the Engine has to assume pessimistically that such optimizations will be invalid. Code will run slower as a result of using either feature. Don't use them.