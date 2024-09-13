const { toSnakeCase } = require("./utils.js");

class Subscription {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timestamp = new Date(Date.now()).toISOString();
  }
}

module.exports = Subscription;