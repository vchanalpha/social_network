/**
 */

import { input } from "@inquirer/prompts";
import Network from "./network.js";
import { validateName } from "./utils.js";

const init = async () => {
  await input({
    message: "You're the first user on the Social Network! What's your name?",
    validate: validateName,
  }).then((name) => {
    new Network(name).menu();
  });
};

init();
