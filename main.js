/**
 */

import { select, input, Separator } from "@inquirer/prompts";

const mainMenu = await select({
  message: "Welcome to the Social Network. What would you like to do now?",
  choices: [
    {
      name: "Register an account",
      value: "register",
      description: "",
    },
    {
      name: "Login to your account",
      value: "login",
      description: "",
    },
    new Separator(),
  ],
});

const answer = await input({ message: "Enter your name" }).then((name) => {
  console.log("Create user name");
});

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});
