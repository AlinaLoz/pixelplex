const {getError} = require("./error");
const CONST = require("../const");
const isNumber = require('is-number');

exports.validLimit = function(limit) {
  if (!isNumber(limit)) return getError("limit", "Field limit must be number");
  if (limit.toString().includes('.')) return getError("limit", "Field limit must be whole number");
  if (limit < 0 || limit > CONST.APP_CONST.MAX_LIMIT) return getError("limit","Field limit must be number between 0 and 10");
  return true;
};

exports.validPage = function(page) {
  if (!isNumber(page)) return getError("page", "Field page must be number");
  if (page.toString().includes('.')) return getError("page", "Field page must be whole number");
  if (page < 0) return getError("page", "Field page must be positive number");
  return true;
};
