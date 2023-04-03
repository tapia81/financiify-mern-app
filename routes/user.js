const { Router } = require("express");
const userRouter = Router();
const {
  createUser,
  getUserWithStocksAndTransactions,
  getAccountValue,
} = require("../controllers/user");

userRouter.post("/users", createUser);

userRouter.get("/users/:userId", getUserWithStocksAndTransactions);

userRouter.get("/users/:userId/account-value", getAccountValue);

module.exports = userRouter;
