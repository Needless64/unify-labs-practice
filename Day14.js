let str = "25";
let num1 = Number(str);
let num2 = parseInt(str);
let num3 = +str;

if (num1 > 20) {
  console.log("Greater than 20");
} else if (num1 === 20) {
  console.log("Equal to 20");
} else {
  console.log("Less than 20");
}

let result = num1 % 2 === 0 ? "Even" : "Odd";
console.log(result);

let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid");
}

for (let i = 1; i <= 3; i++) {
  console.log("For loop:", i);
}

let i = 1;
while (i <= 3) {
  console.log("While loop:", i);
  i++;
}

let j = 1;
do {
  console.log("Do while loop:", j);
  j++;
} while (j <= 3);

let arr = [10, 20, 30];
for (let x of arr) {
  console.log("For of:", x);
}

let obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log("For in:", key, obj[key]);
}

for (let x = 1; x <= 2; x++) {
  for (let y = 1; y <= 2; y++) {
    console.log("Nested loop:", x, y);
  }
}
