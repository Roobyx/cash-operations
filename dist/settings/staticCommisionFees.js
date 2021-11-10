"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naturalCashOutFees = exports.juridicalCashOutFees = exports.cashInFees = void 0;
// Static (offline) settings for commision fees
var cashInFees = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR"
  }
};
exports.cashInFees = cashInFees;
var juridicalCashOutFees = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: "EUR"
  }
};
exports.juridicalCashOutFees = juridicalCashOutFees;
var naturalCashOutFees = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: "EUR"
  }
};
exports.naturalCashOutFees = naturalCashOutFees;