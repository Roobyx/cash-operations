"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cashIn = _interopRequireDefault(require("./cashIn"));

var _cashOut = require("./cashOut");

/* eslint-disable no-undef */
// Cash in
test("Testing the calculation of the fee for Cash In operations. The result should be 0.09", function () {
  expect((0, _cashIn["default"])(300)).toBe("0.09");
});
test("Testing the calculation cap of the fee calculation for Cash In operations. The result should never be more than 5.00 ", function () {
  expect((0, _cashIn["default"])(500000)).toBe("5.00");
});
test("Testing the calculation of the fee for Cash In operations with 0. The result should be 0.00", function () {
  expect((0, _cashIn["default"])(0)).toBe("0.00");
});
test("Testing the calculation of the fee for Cash In operations with negative input. The result should be 0.00", function () {
  expect((0, _cashIn["default"])(-10)).toBe("0.00");
}); // Cash out
// Juridical

test("Testing the calculation of the fee for Cash Out operations. The result should be 0.90", function () {
  expect((0, _cashOut.cashOutJuridical)(300)).toBe("0.90");
});
test("Testing the calculation cap of the fee calculation for Cash In operations. The result should be 1500.00. There should be no cap.", function () {
  expect((0, _cashOut.cashOutJuridical)(500000)).toBe("1500.00");
});
test("Testing the calculation minimal cap of the fee calculation for Cash Out operations. The result should be not less than 0.50.", function () {
  expect((0, _cashOut.cashOutJuridical)(1)).toBe("0.50");
});
test("Testing the calculation of Cash Out operations with negative numbers. The result should be not less than 0.50.", function () {
  expect((0, _cashOut.cashOutJuridical)(-1)).toBe("0.50");
}); // Natural

test("Testing Cash Out natural with 2 new users. There should be no commission fee. The function is just a wrapper around updateTransactionHistory", function () {
  expect((0, _cashOut.cashOutNatural)(1, [{
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: {
      amount: "200.00",
      currency: "EUR"
    }
  }, {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: {
      amount: "300.00",
      currency: "EUR"
    }
  }], 1000)).toBe("0.00");
});
test("Testing Cash Out Natural fee calculation on a Monday and a sum less than 1000. Should result in 0.00 fee", function () {
  expect((0, _cashOut.updateTransactionHistory)(1, "Monday", 1000)).toBe("0.00");
});
test("Testing Cash Out Natural fee calculation on a Monday and a sum bigger than 1000. Should result in 3.00 fee", function () {
  expect((0, _cashOut.updateTransactionHistory)(1, "Monday", 2000)).toBe("3.00");
});
test("Testing Cash Out Natural fee calculation on a Tuesday and a sum equal to 1000. Should result in 0.00 fee", function () {
  expect((0, _cashOut.updateTransactionHistory)(1, "Tuesday", 1000)).toBe("0.00");
});
test("Testing Cash Out Natural fee calculation on a Tuesday and a sum lower than 1000. Should result in 0.00 fee", function () {
  expect((0, _cashOut.updateTransactionHistory)(1, "Tuesday", 400)).toBe("0.00");
});
test("Testing Cash Out Natural fee calculation on a Tuesday and a sum lower than 1000. Should result in 0.00 fee", function () {
  expect((0, _cashOut.updateTransactionHistory)(1, "Sunday", 999)).toBe("0.00");
});