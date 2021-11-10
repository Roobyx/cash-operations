"use strict";

var _helpers = require("./helpers");

/* eslint-disable no-undef */
test("Testing the simple get commision", function () {
  expect((0, _helpers.getCommision)(300, 0.03)).toBe(0.09);
});
test("Testing commision calculation with 0 amount to tax", function () {
  expect((0, _helpers.getCommision)(0, 10)).toBe(0.00);
});
test("Testing commision calculation with 0% fee", function () {
  expect((0, _helpers.getCommision)(110, 0)).toBe(0.00);
});
test("Testing commision calculation with 0% fee", function () {
  expect((0, _helpers.getCommision)(110, -1)).toBe(0.00);
}); // Get transaction info

test("Testing getting type of transaction", function () {
  expect((0, _helpers.getTranscationType)({
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: {
      amount: "200.00",
      currency: "EUR"
    }
  })).toBe("cash_in");
});
test("Testing getting user type of transaction", function () {
  expect((0, _helpers.getTransactionUserType)({
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: {
      amount: "200.00",
      currency: "EUR"
    }
  })).toBe("natural");
});