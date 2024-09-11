/**
 */

const { input } = require("@inquirer/prompts");
const Network = require("./Network.js");
const { validateName } = require("./utils.js");

const init = async () => {
  await input({
    message: "You're the first user on the Social Network! What's your name?",
    validate: validateName,
  }).then((name) => {
    new Network(name).menu();
  });
};

init();
