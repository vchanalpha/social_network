import { formatTimeStamp } from "./utils.js";

class Post {
  constructor(id, name, message) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.timestamp = Date.now();
  }

  // Methods
  print() {
    console.log(`[%s]`, this.name);
    console.log(this.message);
    console.log(formatTimeStamp(this.timestamp));
    console.log("");
  }
}

export default Post;
