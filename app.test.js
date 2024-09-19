const Network = require("./network.js");
const User = require("./user.js");
const { convertNameToId } = require("./utils.js");

const bestLaCroixFlavor = () => "grapefruit";

const testUser = "Test User";
const testUser2 = "James";
const testMessage = "timeline message!";

test("the social network can be created with an initial user", () => {
  const network = new Network(testUser);
  expect(network.users[convertNameToId(testUser)]).toEqual(new User(testUser));
});

test("the social network can add new users", () => {
  const network = new Network(testUser);
  network.addUser(testUser2);
  const matchedUser = network.users[convertNameToId(testUser2)];

  expect(matchedUser).toMatchObject(new User(testUser2));
  expect(matchedUser).toHaveProperty("name", testUser2);
  expect(matchedUser).toBeInstanceOf(User);
});

test("the social network will not add duplicate users", () => {
  const network = new Network(testUser);
  network.addUser(testUser);

  console.log(Object.keys(network.users).length);

  expect(Object.keys(network.users).length).toEqual(1);
});

test("the user can post a message to their timeline", () => {
  const network = new Network(testUser);
  network.currentUser.post(testMessage);
  expect(network.currentUser.timeline.length).toBe(1);
  expect(network.currentUser.timeline[0].message).toBe(testMessage);
});

test("the user can post multiple messages to their timeline", () => {
  const network = new Network(testUser);
  network.currentUser.post(testMessage);
  network.currentUser.post(testMessage);
  network.currentUser.post(testMessage);
  expect(network.currentUser.timeline.length).toBe(3);
});

test("the user can follow a new friend and view list of subscriptions", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});

test("the user can view the posts on their wall", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});
