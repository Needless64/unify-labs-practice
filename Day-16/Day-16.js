let name = "Aditya";
let age = "19";
let num = Number(age);

let msg = `Hi i am ${name}, next i will be ${num + 1}`;

let text = "Hello\nWorld";

let pow = Math.pow(2, 3);
let root = Math.sqrt(16);

function greet(user = "Guest") {
  return `Welcome ${user}`;
}

let sum = (a, b) => a + b;

function testScope() {
  let x = 10;
  if (x > 5) {
    let y = 20;
    return y;
  }
}

let result1 = greet(name);
let result2 = sum(5, 3);
let result3 = testScope();

console.log(msg);
console.log(text);
console.log(pow);
console.log(root);
console.log(result1);
console.log(result2);
console.log(result3);
