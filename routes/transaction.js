const { Router } = require("express");
const transactionRouter = Router();
const { checkForStock } = require("../helpers/validation");
const {
  buyingTransaction,
  getTransactions,
  sellingTransaction,
} = require("../controllers/transaction");

transactionRouter.post(
  "/transactions/:userId/buy",
  buyingTransaction
);
transactionRouter.post("/transactions/:userId/sell", sellingTransaction);
transactionRouter.get("/transactions", getTransactions);

module.exports = transactionRouter;
