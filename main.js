/**
 */

import { select, input, Separator } from "@inquirer/prompts";
import User from "./user.js";
const network = [new User("admin")];

const askForPostMessage = async (name) => {
  await input({ message: "What's your message?" }).then((message) => {
    // create user
    const user = new User(name);
    // create post by user
    user.post(message);
    network.push(user);
  });
};

const askForName = await input({ message: "Enter your name" }).then((name) => {
  askForPostMessage(name);
});

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
    {
      name: "Post a message",
      value: "post",
      description: "",
    },
    new Separator(),
  ],
}).then((value) => {
  if (value === "post") {
    askForName();
  }
});
