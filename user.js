class User {
  constructor(name) {
    this.id = toSnakeCase(name);
    this.name = name;
    this.timeline = [];
    this.wall = [];
  }

  // Getters
  get wall() {
    forEach.wall(console.log);
  }
  get timeline() {
    forEach.timeline(console.log);
  }

  // Methods
  follow() {
    return;
  }

  wall() {
    return;
  }
}

export default User;
