const { convertNameToId } = require("./utils.js");
const { formatTimeStamp } = require("./utils.js");

class Subscription {
  constructor(name) {
    this.id = convertNameToId(name);
    this.name = name;
    this.timestamp = Date.now(); // new Date(Date.now()).toISOString();
  }

  // Methods
  print() {
    console.log(`You started following %s`, this.name);
    console.log(formatTimeStamp(this.timestamp));
    console.log(" ");
  }

  list() {
    console.log(this.name, formatTimeStamp(this.timestamp));
    console.log(" ");
  }
}

module.exports = Subscription;
