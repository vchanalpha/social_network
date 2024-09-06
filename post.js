import { style } from "./style.js";

class Post {
  constructor(id, name, message, timestamp) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.timestamp = timestamp;
  }

  // Methods
  print() {
    console.log(`%c${this.name}`, style.name);
    console.log(this.message);
  }
}

export default Post;
