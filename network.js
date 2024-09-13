const { input, select, Separator } = require("@inquirer/prompts");
const User = require("./User.js");
const { validateName } = require("./utils.js");
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

  follow = async () => {
    let subscriptions = this.currentUser.subscriptions;
    var choices = this.users.reduce(function(filtered, option) {
      if (!subscriptions.includes(option.name)) {
         var someNewValue = { name: option.name, value: option.name }
         filtered.push(someNewValue);
      }
      return filtered;
    }, []);
    await select({
      message: "Select a user to follow",
      choices,
    })
      .then((value) => {
        this.currentUser.follow(value);
      })
      .finally(() => {
        this.menu();
      });
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
        {
          name: "View timeline of user I have subscribed to",
          value: "timeline",
          description: "",
        },
        {
          name: "Follow a new user",
          value: "follow",
          description: "",
        },
        {
          name: "View my wall",
          value: "wall",
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

module.exports = Network;
