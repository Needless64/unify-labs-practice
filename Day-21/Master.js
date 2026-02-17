"use strict";

let cat = {
  name: "Milo",
  age: 2,
  sound() {
    console.log(this.name + " says meow");
  },
};

cat.sound();

let json = JSON.stringify(cat);
console.log(json);

let obj = JSON.parse(json);
console.log(obj);

function show() {
  console.log(this.name);
}

let cat1 = { name: "Luna" };
let cat2 = { name: "Leo" };

show.call(cat1);
show.apply(cat2);

let bound = show.bind(cat1);
bound();

localStorage.setItem("catName", "Simba");
let storedCat = localStorage.getItem("catName");
console.log(storedCat);

sessionStorage.setItem("catAge", "3");
console.log(sessionStorage.getItem("catAge"));

document.cookie = "cat=Kitty";

export function add(a, b) {
  return a + b;
}
