import { style } from "./style";

class Post {
  constructor(user, message) {
    this.id = user.id;
    this.name = user.name;
    this.message = message;
  }

  // Methods
  print() {
    console.log(`%c${this.name}`, style.name);
    console.log(this.message);
  }
}

export default Post;
