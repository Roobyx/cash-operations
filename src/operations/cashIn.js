// Cash in operation related functionality
// ------------------------------------------

import { getCommision } from "../global/helpers";
import { cashInFees } from "../settings/staticCommisionFees";

// Parse Cash IN transaction
const cashIn = (amount) => {
  let commision = getCommision(amount, cashInFees.percents);

  if (commision > cashInFees.max.amount) {
    commision = cashInFees.max.amount;
  }

  return commision.toFixed(2);
};

export default cashIn;
