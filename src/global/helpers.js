// Global file to hold the helper functions
// ------------------------------------------

// Get info for given transaction
export const getTranscationType = (transaction) => transaction.type;
export const getTransactionUserType = (transaction) => transaction.user_type;

export const getCommision = (amountToTax, commisionPercent) => {
  let commision = Math.ceil(amountToTax * commisionPercent) / 100;

  if (commision < 0) {
    commision = 0;
  }

  return commision;
};
