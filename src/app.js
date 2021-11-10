// Vendor
import { stat, readFileSync } from "fs";

import { getTranscationType, getTransactionUserType } from "./global/helpers";
import cashIn from "./operations/cashIn";
import { cashOutJuridical, cashOutNatural } from "./operations/cashOut";

const jsonFilePath = process.argv[2];

// Parse all transactions - go trough all the transactions, determine their type
// and execute the needed logic
const parseTransactions = (transactionsData) => {
  transactionsData.map((transaction, index) => {
    const currentTransactionType = getTranscationType(transaction);
    const currentTransactionUserType = getTransactionUserType(transaction);
    let commisionFee;

    if (currentTransactionType === "cash_in") {
      const cashInFee = cashIn(transaction.operation.amount);
      // Disabling eslint to print to console
      // eslint-disable-next-line no-console
      console.log(cashInFee);
      commisionFee = cashIn(transaction.operation.amount);
    } else if (currentTransactionType === "cash_out") {
      if (currentTransactionUserType === "natural") {
        const cashOutNaturalCommision = cashOutNatural(
          transaction.user_id,
          transactionsData.slice(0, index + 1)
            .filter((currentTransaction) => currentTransaction.user_id === transaction.user_id && currentTransaction.type === "cash_out"),
        );

        // Disabling eslint to print to console
        // eslint-disable-next-line no-console
        console.log(cashOutNaturalCommision);
      } else if (currentTransactionUserType === "juridical") {
        const juridicalCashOutFee = cashOutJuridical(transaction.operation.amount);
        // Disabling eslint to print to console
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
};

// Check if the file path exists and if it is a valid one
stat(jsonFilePath, (err, stats) => {
  if (err === null && !stats.isDirectory()) {
    const rawdata = readFileSync(jsonFilePath);
    const transactions = JSON.parse(rawdata);
    parseTransactions(transactions);
  } else {
    // Disabling eslint to print to console
    // Log "wrong filepath" error message
    // eslint-disable-next-line no-console
    console.log("Please provide a valid filepath to a JSON file.");
  }
});
