"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranscationType = exports.getTransactionUserType = exports.getCommision = void 0;

// Global file to hold the helper functions
// ------------------------------------------
// Get info for given transaction
var getTranscationType = function getTranscationType(transaction) {
  return transaction.type;
};

exports.getTranscationType = getTranscationType;

var getTransactionUserType = function getTransactionUserType(transaction) {
  return transaction.user_type;
};

exports.getTransactionUserType = getTransactionUserType;

var getCommision = function getCommision(amountToTax, commisionPercent) {
  var commision = Math.ceil(amountToTax * commisionPercent) / 100;

  if (commision < 0) {
    commision = 0;
  }

  return commision;
};

exports.getCommision = getCommision;