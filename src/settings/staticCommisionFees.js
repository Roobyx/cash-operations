// Static (offline) settings for commision fees

export const cashInFees = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR",
  },
};

export const juridicalCashOutFees = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: "EUR",
  },
};

export const naturalCashOutFees = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: "EUR",
  },
};
