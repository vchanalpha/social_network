const convertNameToId = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) // Match words
    .map((x) => x.toLowerCase()) // Convert to lowercase
    .join("_"); // Join words with underscores

// validateSnakeCase method checks the given string is in snake_case or not.
// Problem Source & Explanation: https://en.wikipedia.org/wiki/Naming_convention_(programming)

/**
 * validateSnakeCase method returns true if the string in snake_case, else return the false.
 * @param {String} varName the name of the variable to check.
 * @returns `Boolean` return true if the string is in snake_case, else return false.
 */
const validateSnakeCase = (varName) => {
  // firstly, check that input is a string or not.
  if (typeof varName !== "string") {
    throw new TypeError("Argument is not a string.");
  }

  const pat = /(.*?)_([a-zA-Z])*/;
  return pat.test(varName);
};

const validateName = (varName) => {
  // firstly, check that input is a string or not.
  if (typeof varName !== "string") {
    throw new TypeError("Argument is not a string.");
  }

  const pat = /^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/;
  return pat.test(varName);
};

const formatTimeStamp = (varName) => {
  var d = new Date();

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
};

module.exports = {
  formatTimeStamp,
  validateName,
  validateSnakeCase,
  convertNameToId,
};
