"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = require("fs");

var _helpers = require("./global/helpers");

var _cashIn = _interopRequireDefault(require("./operations/cashIn"));

var _cashOut = require("./operations/cashOut");

// Vendor
var jsonFilePath = process.argv[2]; // Parse all transactions - go trough all the transactions, determine their type
// and execute the needed logic

var parseTransactions = function parseTransactions(transactionsData) {
  transactionsData.map(function (transaction, index) {
    var currentTransactionType = (0, _helpers.getTranscationType)(transaction);
    var currentTransactionUserType = (0, _helpers.getTransactionUserType)(transaction);
    var commisionFee;

    if (currentTransactionType === "cash_in") {
      var cashInFee = (0, _cashIn["default"])(transaction.operation.amount); // Disabling eslint to print to console
      // eslint-disable-next-line no-console

      console.log(cashInFee);
      commisionFee = (0, _cashIn["default"])(transaction.operation.amount);
    } else if (currentTransactionType === "cash_out") {
      if (currentTransactionUserType === "natural") {
        var cashOutNaturalCommision = (0, _cashOut.cashOutNatural)(transaction.user_id, transactionsData.slice(0, index + 1).filter(function (currentTransaction) {
          return currentTransaction.user_id === transaction.user_id && currentTransaction.type === "cash_out";
        })); // Disabling eslint to print to console
        // eslint-disable-next-line no-console

        console.log(cashOutNaturalCommision);
      } else if (currentTransactionUserType === "juridical") {
        var juridicalCashOutFee = (0, _cashOut.cashOutJuridical)(transaction.operation.amount); // Disabling eslint to print to console
        // eslint-disable-next-line no-console

        console.log(juridicalCashOutFee);
      }
    } else {
      // Disabling eslint to print to console
      // Log if operation is invalid
      // eslint-disable-next-line no-console
      console.log("Invalid operation provided");
    }

    return commisionFee;
  });
}; // Check if the file path exists and if it is a valid one


(0, _fs.stat)(jsonFilePath, function (err, stats) {
  if (err === null && !stats.isDirectory()) {
    var rawdata = (0, _fs.readFileSync)(jsonFilePath);
    var transactions = JSON.parse(rawdata);
    parseTransactions(transactions);
  } else {
    // Disabling eslint to print to console
    // Log "wrong filepath" error message
    // eslint-disable-next-line no-console
    console.log("Please provide a valid filepath to a JSON file.");
  }
});