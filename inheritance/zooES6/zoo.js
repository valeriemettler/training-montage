class Animal {
  constructor(animalClass, name, sound) {
    this.name = name;
    this.animalClass = animalClass;
    this.sound = sound;
  }
  speak() {
    console.log(this.name + ' says ' + this.sound);
  }
}

class Bird extends Animal {
  constructor(name, sound, migratory) {
    super('bird', name, sound);
    this.wings = true;
    this.migratory = migratory;
    this.eggs = 0;
  }
  lay() {
    this.eggs += 1;
  }
}

class Mammal extends Animal {
  constructor(name, sound) {
    super('mammal', name, sound);
  }
}

const rooster = new Bird("Rooster", "cock-a-doodle-doo", false);
const spanishRooster = new Bird("Spanish Rooster", "kikirikí", false);
const dog = new Mammal("dog", "woof!");

rooster.lay();
console.log(rooster);
console.log(spanishRooster);
console.log(dog);
console.log('The rooster has ' + rooster.eggs + ' egg(s).');
spanishRooster.speak();