const { Router } = require("express");
const stockRouter = Router();
const { createStock, getStocks } = require("../controllers/stock");

stockRouter.post("/stocks/:userId/add", createStock);
stockRouter.get("/stocks/", getStocks);

module.exports = stockRouter;
