import { toSnakeCase } from "./utils.js";

class User {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timeline = [];
    this.wall = [];
  }

  // Getters
  getWall() {
    forEach.wall(console.log);
  }
  getTimeline() {
    forEach.timeline(console.log);
  }

  // Methods
  follow() {
    return;
  }

  wall() {
    return;
  }

  post(message) {
    this.timeline.push(Post(this.id, this.name, message));
  }
}

export default User;
