let title = document.getElementById("title");
title.innerText = "Cats and DOM";

let box = document.querySelector(".box");
box.style.color = "purple";
box.style.backgroundColor = "lightpink";

let img = document.getElementById("catImg");
img.setAttribute("src", "https://i.ibb.co/Y7SGRzjb/image.png");
img.setAttribute("alt", "cute cat");

let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  let p = document.createElement("p");
  p.innerText = "Meow button clicked 🐱";
  document.body.appendChild(p);
});

let link = document.getElementById("link");
link.setAttribute("href", "#");

document.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    document.body.style.backgroundColor = "lavender";
  }
});

console.log(window.location.href);
