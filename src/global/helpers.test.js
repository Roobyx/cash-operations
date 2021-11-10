/* eslint-disable no-undef */
import { getCommision, getTranscationType, getTransactionUserType } from "./helpers";

test("Testing the simple get commision", () => {
  expect(getCommision(300, 0.03)).toBe(0.09);
});

test("Testing commision calculation with 0 amount to tax", () => {
  expect(getCommision(0, 10)).toBe(0.00);
});

test("Testing commision calculation with 0% fee", () => {
  expect(getCommision(110, 0)).toBe(0.00);
});

test("Testing commision calculation with 0% fee", () => {
  expect(getCommision(110, -1)).toBe(0.00);
});

// Get transaction info

test("Testing getting type of transaction", () => {
  expect(getTranscationType({
    date: "2016-01-05", user_id: 1, user_type: "natural", type: "cash_in", operation: { amount: "200.00", currency: "EUR" },
  })).toBe("cash_in");
});

test("Testing getting user type of transaction", () => {
  expect(getTransactionUserType({
    date: "2016-01-05", user_id: 1, user_type: "natural", type: "cash_in", operation: { amount: "200.00", currency: "EUR" },
  })).toBe("natural");
});
