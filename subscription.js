const { toSnakeCase } = require("./utils.js");
const { formatTimeStamp } = require("./utils.js");

class Subscription {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timestamp = Date.now(); // new Date(Date.now()).toISOString();
  }

    // Methods
    print() {
      console.log(`You started following %s`, this.name);
      console.log(formatTimeStamp(this.timestamp));
      console.log(" ");
    }
}

module.exports = Subscription;