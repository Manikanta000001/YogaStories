const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

module.exports = {
  CASHFREE_BASE_URL,
  CASHFREE_CLIENT_ID: process.env.CASHFREE_CLIENT_ID,
  CASHFREE_CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET,
};