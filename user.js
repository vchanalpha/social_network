const Post = require("./post.js");
const Subscription = require("./subscription.js");
const { toSnakeCase } = require("./utils.js");

class User {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timeline = [];
    this.wall = [];
    this.subscriptions = [];
  }

  // Getters
  getWall() {
    this.wall.forEach((post) => {
      post.print();
    });
  }
  getTimeline() {
    this.timeline.forEach((post) => {
      post.print();
    });
  }

  getSubscriptions() {
    this.subscriptions.forEach((post) => {
      post.name.print();
    });
  }

  // Methods
  follow(user) {
    this.subscriptions.push(new Subscription(user));
  }

  wall() {
    return;
  }

  post(message) {
    this.timeline.push(new Post(this.id, this.name, message));
  }
}

module.exports = User;
