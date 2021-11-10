"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("../global/helpers");

var _staticCommisionFees = require("../settings/staticCommisionFees");

// Cash in operation related functionality
// ------------------------------------------
// Parse Cash IN transaction
var cashIn = function cashIn(amount) {
  var commision = (0, _helpers.getCommision)(amount, _staticCommisionFees.cashInFees.percents);

  if (commision > _staticCommisionFees.cashInFees.max.amount) {
    commision = _staticCommisionFees.cashInFees.max.amount;
  }

  return commision.toFixed(2);
};

var _default = cashIn;
exports["default"] = _default;