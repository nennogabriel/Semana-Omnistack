module.exports = function parseStringToArray(stringWithCommas) {
  return stringWithCommas.split(",").map(item => item.trim().toLowerCase());
};
