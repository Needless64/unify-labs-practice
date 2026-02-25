// Boot-Sequence login

var Master_pin = "8790";
var attempts = 3;
var loggedIn = false;

for (var i = 0; i < attempts; i++) {
  var enteredPin = prompt("Enter Master PIN:");
  if (enteredPin === Master_pin) {
    loggedIn = true;
    break;
  } else {
    alert("Wrong PIN! Attempts left: " + i + "/" + attempts);
  }
}

if (!loggedIn) {
  alert("SYSTEM SELF-DESTRUCT");
  for (var j = 3; j > 0; j--) {
    alert("Self-destruct in " + j + " seconds...");
  }
  alert("SYSTEM OFFLINE");
} else {
  alert("Login successful!");

  // Main cmd Kernel

  var balance = 1000;

  while (true) {
    var command = prompt("Enter command bank, shop, vault, exit:");
    switch (command) {
      case "bank":
        var bankCommand = prompt(
          "Enter bank command (deposit, withdraw, balance, back):",
        );
        switch (bankCommand) {
          case "deposit":
            var amount = parseFloat(prompt("Enter amount to deposit:"));
            balance += amount;
            alert("Deposited: ₹" + amount + ". New balance: ₹" + balance);
            break;
          case "withdraw":
            var amount = parseFloat(prompt("Enter amount to withdraw:"));
            if (amount > balance) {
              alert("Insufficient funds! Current balance: ₹" + balance);
            } else {
              balance -= amount;
              alert("Withdrew: ₹" + amount + ". New balance: ₹" + balance);
            }
            break;
          case "balance":
            alert("Current balance: ₹" + balance);
            break;
          case "back":
            break;
          default:
            alert("Invalid bank command!");
        }

      // Smart-Shop
      case "shop":
        var shopCommand = prompt(
          "Enter The Quanitity of the item you want to buy (1-5) or 'back' to return:",
        );
        if (shopCommand === "back") {
          break;
        } else {
          var quantity = parseInt(shopCommand);
          if (quantity >= 1 && quantity <= 5) {
            var price = quantity * 100;
            if (price > balance) {
              alert(
                "Insufficient funds! Total price: ₹" +
                  price +
                  ". Current balance: ₹" +
                  balance,
              );
            } else {
              balance -= price;
              alert(
                "Purchased " +
                  quantity +
                  " items for ₹" +
                  price +
                  ". New balance: ₹" +
                  balance,
              );
            }
          } else {
            alert("Invalid quantity! Please enter a number between 1 and 5.");
          }
        }
        break;
      case "vault":
        var secret = "Gatto123";
        var secretCode = prompt("Enter vault code:");
        if (secretCode === secret) {
          alert(
            "Vault opened! You found a hidden treasure worth ₹5000! and the blessing of the felines 😺",
          );
          balance += 5000;
          alert("New balance: ₹" + balance);
          alert(
            "Congratulations! You've aquired the legendary 'Cat's Blessing' item! 🐾",
          );
          var img = document.getElementById("blessingImage");
          img.style.display = "block";
        } else {
          alert("Incorrect vault code! Returning to main menu.");
        }
        break;
      case "exit":
        alert("Exiting system. Bai~ Bai~ !");
        break;
      default:
        alert(
          "Invalid command! Please enter 'bank', 'shop', 'vault', or 'exit'.",
        );
    }
    break;
  }
}
