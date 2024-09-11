const Post = require("./post.js");
const { toSnakeCase } = require("./utils.js");

class User {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timeline = [];
    this.wall = [];
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

  // Methods
  follow() {
    return;
  }

  wall() {
    return;
  }

  post(message) {
    this.timeline.push(new Post(this.id, this.name, message));
  }
}

module.exports = User;
