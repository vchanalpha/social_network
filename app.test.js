const Network = require("./network.js");
const User = require("./user.js");
const { convertNameToId } = require("./utils.js");

const bestLaCroixFlavor = () => "grapefruit";

const testUser = "Test User";
const testUser2 = "James";
const testUser3 = "John";
const testUser4 = "Mary";
const testMessage = "timeline message!";
const testMessage2 = "timeline message 2!";
const testMessage3 = "timeline message 3!";

const addDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1));
};

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

test("the user can follow a new friend", () => {
  const network = new Network(testUser);
  network.currentUser.follow(testUser2);
  expect(network.currentUser.subscriptions).toHaveProperty(convertNameToId(testUser2));
  network.currentUser.follow(testUser3);
  expect(network.currentUser.subscriptions).toHaveProperty(convertNameToId(testUser3));
  expect(Object.keys(network.currentUser.subscriptions).length).toBe(2);
});

test("the user can see a chronological timeline with posts from their followees", async () => {
  const network = new Network([testUser, testUser2, testUser3], true);
  network.currentUser = network.users[convertNameToId(testUser)];
  network.currentUser.follow(testUser2);

  await addDelay();
  network.users[convertNameToId(testUser)].post(`First post from ${testUser}`);
  await addDelay();
  network.users[convertNameToId(testUser2)].post(
    `First post from ${testUser2}`
  );
  await addDelay();
  network.users[convertNameToId(testUser3)].post(
    `First post from ${testUser3}`
  );
  await addDelay();
  network.currentUser.follow(testUser3);
  await addDelay();
  network.users[convertNameToId(testUser3)].post(
    `Second post from ${testUser3}`
  );
  await addDelay();
  network.users[convertNameToId(testUser2)].post(
    `Second post from ${testUser2}`
  );
  await addDelay();
  network.users[convertNameToId(testUser)].post(`Second post from ${testUser}`);

  expect(network.currentUser.subscriptions).toHaveProperty(
    convertNameToId(testUser2)
  );

  const timeStamps = network.currentUser.timeline.map(
    ({ timestamp }) => timestamp
  );

  const isChronological = Boolean(
    timeStamps.reduce((prev, curr) => {
      if (prev === 0) {
        return 0;
      }
      if (prev && curr < prev) {
        return 0;
      }
      return curr;
    }, true)
  );

  expect(isChronological).toBe(true);
});

test("the user can view the posts on their wall", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});
