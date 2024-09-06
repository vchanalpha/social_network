import { style } from "./style";

class Post {
  constructor(id, name, message) {
    this.id = id;
    this.name = name;
    this.message = message;
  }

  // Methods
  print() {
    console.log(`%c${this.name}`, style.name);
    console.log(this.message);
  }
}

export default Post;
