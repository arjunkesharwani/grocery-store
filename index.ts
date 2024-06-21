import { connectToDatabase } from "./src/config/database";
import * as readline from "readline";
import { setupDatabase } from "./src/models";
import CartService from "./src/services/cart.service"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  await connectToDatabase();
  await setupDatabase();

  const input = await question(
    "Please enter all the items purchased separated by a comma: "
  );
  console.log("User input:", input);
  const items = input.split(",").map((item) => item.trim().toLowerCase());

  for (const item of items) {
    await CartService.addItem(item);
  }

  await CartService.printReceipt();
  await CartService.clearCart();
}

main();
