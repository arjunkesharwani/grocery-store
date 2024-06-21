import { connectToDatabase } from "./src/config/database";
import * as readline from "readline";
import { setupDatabase } from "./src/models";

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
}

main();
