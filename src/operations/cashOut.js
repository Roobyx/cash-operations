// Cash in operation related functionality
// ------------------------------------------
// Vendor imports
import { DateTime } from "luxon";

import { getCommision } from "../global/helpers";
import { juridicalCashOutFees, naturalCashOutFees } from "../settings/staticCommisionFees";

const userExampleLocale = "bg-Bg";

// Registry for all CASH OUT transactions of JURIDICAL type users
const juridicalUserTransactionLog = [];

// Parse Cash OUT - Juridical transaction
export const cashOutJuridical = (amount) => {
  let commision = getCommision(amount, juridicalCashOutFees.percents);

  if (commision < juridicalCashOutFees.min.amount) {
    commision = juridicalCashOutFees.min.amount;
  }

  return commision.toFixed(2);
};

// Handles the user usage registry with information from a given transaction
// Takes in the user's id, the transaction date and the amount of the transaction
// (Serves as a way of persisting data for the given program. This would be more
// more dynamic with access to a DB endpoint)
export const updateTransactionHistory = (transactionUserId, transactionDate, transactionAmount) => {
  let commision = 0;

  // Check if the user has already been added (if there are records of transactions)
  // made by him
  if (juridicalUserTransactionLog.some((transaction) => transaction.id === transactionUserId)) {
    const currentUserIndex = juridicalUserTransactionLog
      .findIndex((transaction) => transaction.id === transactionUserId);
    const currentUserData = juridicalUserTransactionLog[currentUserIndex];
    let { totalWeeklySum } = currentUserData;
    let overdrawState = currentUserData.overdraw;
    let amountToTax = 0;

    // Resets the weekly total sum of the given user since the transcation
    // was made on Monday
    if (transactionDate === "Monday") {
      totalWeeklySum = 0;
      overdrawState = false;
    }

    // Checks if the user has already passed the weekly withdraw limit
    // This is done in order to only tax the user for the current transaction amount
    if (overdrawState) {
      amountToTax = transactionAmount;
      commision = getCommision(amountToTax, naturalCashOutFees.percents);
      // If the user has not overdrawn, the second check looks if the current
      // transaction would surpass the weekly limit and if so tax the user on the
      // amount with substracted free limit
    } else if ((totalWeeklySum + transactionAmount) > naturalCashOutFees.week_limit.amount) {
      totalWeeklySum += transactionAmount;
      amountToTax = totalWeeklySum - naturalCashOutFees.week_limit.amount;
      overdrawState = true;
      commision = getCommision(amountToTax, naturalCashOutFees.percents);
    }

    // Log the user to the persistency log
    juridicalUserTransactionLog.push(
      {
        ...currentUserData,
        totalWeeklySum,
        overdraw: overdrawState,
      },
    );
    // Create a new user for the percistenct log
  } else {
    const totalWeeklySum = transactionAmount;
    const overdrawState = transactionAmount > 1000;
    let amountToTax = 0;

    juridicalUserTransactionLog.push(
      {
        id: transactionUserId,
        totalWeeklySum,
        overdraw: overdrawState,
      },
    );

    // Re-applies a stripped down logic for the overdrawn. Only checks if the
    // current transaction surpasses the limit
    if (overdrawState) {
      amountToTax = totalWeeklySum - naturalCashOutFees.week_limit.amount;
      commision = getCommision(amountToTax, naturalCashOutFees.percents);
    // If the current transaction does not surpass it, them the calculation should sum up to 0.00
    } else {
      commision = getCommision(amountToTax, naturalCashOutFees.percents);
    }
  }

  // Return the calculated comission
  return commision.toFixed(2);
};

// Parse Cash OUT - Natural transaction
export const cashOutNatural = (uId, pastUserTransactions) => {
  const latestTransaction = pastUserTransactions.at(-1);
  // Using luxon to determine the day to use it fot the weekly sum reset
  // Taking a sample user locale
  const formatedLatestTransactionDate = DateTime
    .fromISO(latestTransaction.date).setLocale(userExampleLocale).toFormat("EEEE");

  // Passing the current transaction's user, pre-formated transaction date and
  // the amount of the transaction
  return updateTransactionHistory(
    uId,
    formatedLatestTransactionDate,
    latestTransaction.operation.amount,
  );
};
