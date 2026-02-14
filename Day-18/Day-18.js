let cat = {
  name: "Milo",
  age: 2,
  meow() {
    return "Meow " + this.name;
  },
};

console.log(cat.meow());

Object.freeze(cat);

let keys = Object.keys(cat);
let values = Object.values(cat);
let entries = Object.entries(cat);

console.log(keys);
console.log(values);
console.log(entries);

function Cat(name, age) {
  this.name = name;
  this.age = age;
}

let c1 = new Cat("Luna", 3);
console.log(c1);

class Animal {
  constructor(type) {
    this.type = type;
  }
  sound() {
    return this.type + " makes sound";
  }
}

class Kitty extends Animal {
  constructor(name) {
    super("Cat");
    this.name = name;
  }
}

let k = new Kitty("Simba");
console.log(k.sound());

class Pet {
  constructor(weight) {
    this._weight = weight;
  }
  get weight() {
    return this._weight;
  }
  set weight(val) {
    this._weight = val;
  }
}

let p = new Pet(4);
console.log(p.weight);
p.weight = 5;
console.log(p.weight);

for (let key in cat) {
  console.log(key, cat[key]);
}
