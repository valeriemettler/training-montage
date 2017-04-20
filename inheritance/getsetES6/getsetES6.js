class Person {
    constructor(name) {
        this._name = name;
    }
  
    get name() {
        return this._name;
    }
  
    set name(newName) {
        this._name = newName;
    }
  
    walk() {
        console.log(this._name + ' is walking.');
    }
}
         
const bob = new Person('Bob');
console.log(bob.name);  // 'Bob'

const joe = new Person('Joe');
console.log(joe.name); // 'Joe'
joe.name = "Newjoe"; //setter is called here
console.log("joe.name ", joe.name); //Newjoe ...joe was renamed to newjoe with the setter