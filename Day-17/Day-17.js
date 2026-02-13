let arr = [1, 2, 3, 4, 5];

for (let num of arr) {
  console.log(num);
}

let mapped = arr.map((n) => n * 2);
let filtered = arr.filter((n) => n % 2 === 0);
let reduced = arr.reduce((a, b) => a + b, 0);

let [a, b, ...restArr] = arr;

let newArr = [...arr, 6, 7];

function sumAll(...nums) {
  return nums.reduce((x, y) => x + y, 0);
}

console.log(mapped);
console.log(filtered);
console.log(reduced);
console.log(a, b, restArr);
console.log(newArr);
console.log(sumAll(1, 2, 3, 4));
