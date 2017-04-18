function Animal(animalClass, name, sound) {
  this.name = name;
  this.animalClass = animalClass;
  this.sound = sound;
};

Animal.prototype.speak = function () {
  console.log(this.name + ' says ' + this.sound);
};

var dog = new Animal('Mammel', 'Dog', 'woof!');

dog.speak();
console.log(dog);


