const Post = require("./post.js");
const Subscription = require("./subscription.js");
const { convertNameToId } = require("./utils.js");

class User {
  constructor(name) {
    this.id = convertNameToId(name);
    this.name = name;
    this.timeline = [];
    this.wall = [];
    this.subscriptions = {};
  }

  // Getters
  getWall() {
    if (!this.wall.length) {
      console.log("Your wall is empty.\n");
      return;
    }
    this.wall.forEach((post) => {
      post.print();
    });
  }

  getTimeline() {
    if (!this.timeline.length) {
      console.log("Your timeline is empty.\n");
      return;
    }
    this.timeline.forEach((post) => {
      post.print();
    });
  }

  getSubscribedTimeline(user) {
    if (!user.timeline.length) {
      console.log(`${user}'s timeline is empty.\n`);
      return null;
    }
    user.timeline.forEach((post) => {
      post.print();
    });
    return user.timeline;
  }

  getSubscriptions() {
    if (!Object.values(this.subscriptions).keys) {
      console.log("You have no subscriptions.\n");
      return;
    }
    Object.values(this.subscriptions).forEach((subscription) => {
      subscription.print();
    });
  }

  // Methods
  follow(name) {
    const id = convertNameToId(name);
    if (!this.subscriptions[id]) {
      this.subscriptions[id] = new Subscription(name);
    } else {
      console.log(`You are already following ${name}.\n`);
    }
  }

  getWall() {}

  post(message) {
    this.timeline.push(new Post(this.id, this.name, message));
  }
}

module.exports = User;
