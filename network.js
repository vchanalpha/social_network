const { input, select, Separator } = require("@inquirer/prompts");
const User = require("./user.js");
const { validateName, convertNameToId } = require("./utils.js");
class Network {
  constructor(names, testMode = false) {
    this.testMode = Boolean(testMode);
    this.users = {};
    this.currentUser = null;
    this.init(names);
  }

  styledPrompt(message) {
    if (!this.currentUser) {
      return `[No user selected] ${message}`;
    }
    return `[${this.currentUser.name}]  ${message}`;
  }

  init = async (names) => {
    if (!names) {
      await input({
        message: this.styledPrompt(
          "You're the first user on the Social Network! What's your name?"
        ),
        validate: validateName,
      })
        .then((name) => {
          this.addUser(name);
        })
        .finally(() => {
          this.backToMenu();
        });
      return;
    }

    if (typeof names === "object") {
      names.forEach((name) => {
        this.addUser(name);
      });
      this.currentUser = null;
      this.login();
      return;
    }

    if (typeof names === "string") {
      this.addUser(names);
      this.backToMenu();
      return;
    }
  };

  addUser = async (name, onFail) => {
    const id = convertNameToId(name);
    if (!this.users[id]) {
      this.users[id] = new User(name);
      this.currentUser = this.users[id];
    } else {
      if (!this.testMode) {
        console.log(`A user with the name ${name} already exists.`);
      }
      if (onFail) {
        onFail();
      }
    }
  };

  post = async () => {
    await input({ message: this.styledPrompt("What's your message?") })
      .then((message) => {
        this.currentUser.post(message);
      })
      .finally(() => {
        this.backToMenu();
      });
  };

  register = async () => {
    await input({
      message: this.styledPrompt("What's the new user's name?"),
      validate: validateName,
    })
      .then((name) => {
        this.addUser(name, this.register);
      })
      .finally(() => {
        this.backToMenu();
      });
  };

  login = async () => {
    if (this.testMode) return;

    const choices = Object.values(this.users).map(({ id, name }) => ({
      name,
      value: id,
    }));
    await select({
      message: this.styledPrompt("Select your user account"),
      choices,
      loop: false,
    })
      .then((value) => {
        this.currentUser = this.users[value];
      })
      .finally(() => {
        this.backToMenu();
      });
  };

  timeline = async (user) => {
    if (user) {
      this.currentUser.getSubscribedTimeline(user);
    } else {
      this.currentUser.getTimeline();
    }
    this.menu();
  };

  viewSubscribedTimeline = async () => {
    let subscriptions = this.currentUser.subscriptions;
    const choices = Object.values(subscriptions).map(({ id, name }) => ({
      name,
      value: id,
    }));

    if (!choices.length) {
      console.log("You haven't followed anyone yet.");
      this.backToMenu();
      return;
    }

    await select({
      message: this.styledPrompt(
        "Select the user whose timeline you would like to view"
      ),
      choices,
      loop: false,
    }).then((value) => {
      var user = this.users[value];
      this.timeline(user);
    });
  };

  wall = async () => {
    this.currentUser.getWall();
    this.menu();
  };

  follow = async () => {
    let subscriptions = this.currentUser.subscriptions;

    var choices = Object.values(this.users).reduce((filtered, option) => {
      if (!subscriptions[option.id] && option.name !== this.currentUser.name) {
        filtered.push({ name: option.name, value: option.name });
      }
      return filtered;
    }, []);

    if (!choices.length) {
      console.log("You already follow everyone.");
      this.backToMenu();
      return;
    }

    await select({
      message: this.styledPrompt("Select a user to follow"),
      choices,
      loop: false,
    })
      .then((value) => {
        this.currentUser.follow(value);
        this.currentUser.getSubscriptions();
      })
      .finally(() => {
        this.backToMenu();
      });
  };

  backToMenu = () => {
    if (this.testMode) return;

    console.log("\n");
    this.menu();
  };

  menu = async () => {
    if (this.testMode) return false;

    await select({
      loop: false,
      pageSize: 10,
      message: this.styledPrompt(
        `Welcome to the Social Network. What would you like to do now?`
      ),
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
          value: "viewSubscribedTimeline",
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
      console.log("\n");
      this[value]();
    });
  };
}

module.exports = Network;
