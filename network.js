import { input, select, Separator } from "@inquirer/prompts";
import User from "./user.js";
import { validateName } from "./utils.js";

class Network {
  constructor(name) {
    const user = new User(name);
    this.users = [user];
    this.currentUserId = user.id;
  }

  // Getters
  get currentUser() {
    return this.users.find((user) => user.id === this.currentUserId);
  }

  set currentUser(userId) {
    this.currentUserId === userId;
  }

  addUser = async (name) => {
    const newUser = new User(name);
    this.currentUserId = newUser.id;
    this.users = [...this.users, newUser];
  };

  post = async () => {
    await input({ message: "What's your message?" })
      .then((message) => {
        this.currentUser.post(message);
      })
      .finally(() => {
        this.menu();
      });
  };

  register = async () => {
    await input({
      message: "What's the new user's name?",
      validate: validateName,
    })
      .then((name) => {
        if (this.users.find((user) => user.name === name)) {
          console.log(`A user with the name ${name} already exists.`);
          this.register();
        } else {
          this.addUser(name);
          this.menu();
        }
      })
      .finally(() => {});
  };

  login = async () => {
    const choices = this.users.map(({ id, name }) => ({
      name,
      value: id,
    }));
    await select({
      message: "Select your user account",
      choices,
    })
      .then((value) => {
        this.currentUser = value;
      })
      .finally(() => {
        this.menu();
      });
  };

  timeline = async () => {
    this.currentUser.getTimeline();
  };

  menu = async () => {
    await select({
      message: `Welcome to the Social Network ${this.currentUser.name}. What would you like to do now?`,
      choices: [
        {
          name: "Post a message",
          value: "post",
          description: "",
        },
        {
          name: "View my timeline",
          value: "timeline",
          description: "",
        },
        new Separator(),
        {
          name: "Register another user",
          value: "register",
          description: "",
        },
        {
          name: "Login as another user",
          value: "login",
          description: "",
        },
      ],
    }).then((value) => {
      this[value]();
    });
  };
}

export default Network;
