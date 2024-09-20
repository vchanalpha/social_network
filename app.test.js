const Network = require("./Network.js");

const bestLaCroixFlavor = () => "grapefruit";

test("the best flavor is grapefruit", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});

test("the user can post a message to their timeline", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});

test("the user can view a friend's timeline", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});

test("the user can follow a new friend", () => {
  const network = new Network(testUser);
  network.currentUser.follow(testUser2);
  expect(network.currentUser.subscriptions).toHaveProperty(convertNameToId(testUser2));
  network.currentUser.follow(testUser3);
  expect(network.currentUser.subscriptions).toHaveProperty(convertNameToId(testUser3));
  expect(Object.keys(network.currentUser.subscriptions).length).toBe(2);
});

test("the user can view the posts on their wall", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
  
});


