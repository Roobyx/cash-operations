"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTransactionHistory = exports.cashOutNatural = exports.cashOutJuridical = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _luxon = require("luxon");

var _helpers = require("../global/helpers");

var _staticCommisionFees = require("../settings/staticCommisionFees");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userExampleLocale = "bg-Bg"; // Registry for all CASH OUT transactions of JURIDICAL type users

var juridicalUserTransactionLog = []; // Parse Cash OUT - Juridical transaction

var cashOutJuridical = function cashOutJuridical(amount) {
  var commision = (0, _helpers.getCommision)(amount, _staticCommisionFees.juridicalCashOutFees.percents);

  if (commision < _staticCommisionFees.juridicalCashOutFees.min.amount) {
    commision = _staticCommisionFees.juridicalCashOutFees.min.amount;
  }

  return commision.toFixed(2);
}; // Handles the user usage registry with information from a given transaction
// Takes in the user's id, the transaction date and the amount of the transaction
// (Serves as a way of persisting data for the given program. This would be more
// more dynamic with access to a DB endpoint)


exports.cashOutJuridical = cashOutJuridical;

var updateTransactionHistory = function updateTransactionHistory(transactionUserId, transactionDate, transactionAmount) {
  var commision = 0; // Check if the user has already been added (if there are records of transactions)
  // made by him

  if (juridicalUserTransactionLog.some(function (transaction) {
    return transaction.id === transactionUserId;
  })) {
    var currentUserIndex = juridicalUserTransactionLog.findIndex(function (transaction) {
      return transaction.id === transactionUserId;
    });
    var currentUserData = juridicalUserTransactionLog[currentUserIndex];
    var totalWeeklySum = currentUserData.totalWeeklySum;
    var overdrawState = currentUserData.overdraw;
    var amountToTax = 0; // Resets the weekly total sum of the given user since the transcation
    // was made on Monday

    if (transactionDate === "Monday") {
      totalWeeklySum = 0;
      overdrawState = false;
    } // Checks if the user has already passed the weekly withdraw limit
    // This is done in order to only tax the user for the current transaction amount


    if (overdrawState) {
      amountToTax = transactionAmount;
      commision = (0, _helpers.getCommision)(amountToTax, _staticCommisionFees.naturalCashOutFees.percents); // If the user has not overdrawn, the second check looks if the current
      // transaction would surpass the weekly limit and if so tax the user on the
      // amount with substracted free limit
    } else if (totalWeeklySum + transactionAmount > _staticCommisionFees.naturalCashOutFees.week_limit.amount) {
      totalWeeklySum += transactionAmount;
      amountToTax = totalWeeklySum - _staticCommisionFees.naturalCashOutFees.week_limit.amount;
      overdrawState = true;
      commision = (0, _helpers.getCommision)(amountToTax, _staticCommisionFees.naturalCashOutFees.percents);
    } // Log the user to the persistency log


    juridicalUserTransactionLog.push(_objectSpread(_objectSpread({}, currentUserData), {}, {
      totalWeeklySum: totalWeeklySum,
      overdraw: overdrawState
    })); // Create a new user for the percistenct log
  } else {
    var _totalWeeklySum = transactionAmount;

    var _overdrawState = transactionAmount > 1000;

    var _amountToTax = 0;
    juridicalUserTransactionLog.push({
      id: transactionUserId,
      totalWeeklySum: _totalWeeklySum,
      overdraw: _overdrawState
    }); // Re-applies a stripped down logic for the overdrawn. Only checks if the
    // current transaction surpasses the limit

    if (_overdrawState) {
      _amountToTax = _totalWeeklySum - _staticCommisionFees.naturalCashOutFees.week_limit.amount;
      commision = (0, _helpers.getCommision)(_amountToTax, _staticCommisionFees.naturalCashOutFees.percents); // If the current transaction does not surpass it, them the calculation should sum up to 0.00
    } else {
      commision = (0, _helpers.getCommision)(_amountToTax, _staticCommisionFees.naturalCashOutFees.percents);
    }
  } // Return the calculated comission


  return commision.toFixed(2);
}; // Parse Cash OUT - Natural transaction


exports.updateTransactionHistory = updateTransactionHistory;

var cashOutNatural = function cashOutNatural(uId, pastUserTransactions) {
  var latestTransaction = pastUserTransactions.at(-1); // Using luxon to determine the day to use it fot the weekly sum reset
  // Taking a sample user locale

  var formatedLatestTransactionDate = _luxon.DateTime.fromISO(latestTransaction.date).setLocale(userExampleLocale).toFormat("EEEE"); // Passing the current transaction's user, pre-formated transaction date and
  // the amount of the transaction


  return updateTransactionHistory(uId, formatedLatestTransactionDate, latestTransaction.operation.amount);
};

exports.cashOutNatural = cashOutNatural;