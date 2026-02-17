console.log("Start");

setTimeout(() => {
  console.log("Timeout done");
}, 1000);

function fetchData(callback) {
  setTimeout(() => {
    callback("Cat data loaded");
  }, 500);
}

fetchData((msg) => {
  console.log(msg);
});

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved 🐱");
  }, 800);
});

promise.then((res) => console.log(res));

async function getCat() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error", err);
  }
}

getCat();

function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log("Closure count:", count);
  };
}

let counter = outer();
counter();
counter();

console.log(a);
var a = 5;

console.log("End");
