const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");
const { Stock } = require("../models/stock");

async function buyingTransaction(req, res) {
  const { userId } = req.params;
  const { transactionType, inputtedStock, shares, marketPrice, name, symbol } =
    req.body;

  try {
    // return console.log(
    //   transactionType,
    //   inputtedStock,
    //   shares,
    //   marketPrice,
    //   name,
    //   symbol
    // );
    if (transactionType !== "buy" && transactionType !== "Buy") {
      return res.status(400).json({
        message: "Transaction type is not set to buy!!!",
      });
    }

    let newStock;
    let user;
    let total = marketPrice * shares;

    const checkForStock = await Stock.findOne({
      symbol: symbol,
      name: name,
    });

    if (!checkForStock) {
      newStock = await Stock.create({
        symbol,
        name,
        shares: 0,
        market: marketPrice,
      });
      user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { stocks: newStock._id } },
        { new: true }
      ).populate("stocks");
    }

    if (!inputtedStock && !newStock) {
      newStock = await Stock.findOne({
        symbol: symbol,
        name: name,
      });
    }

    const transaction = await Transaction.create({
      type: transactionType,
      symbol: symbol,
      stock: newStock ? newStock.id : inputtedStock,
      shares: shares,
      price: marketPrice,
      total: total,
    });

    if (transaction) {
      user = await User.findByIdAndUpdate(
        userId,
        [
          {
            $set: {
              buying_power: {
                $round: [{ $subtract: ["$buying_power", total] }, 2],
              },
            },
          },

          { $set: { transactions: transaction._id } },
        ],

        { new: true },
        function (err, doc) {
          if (err) {
            console.log("Error:", err);
          } else {
            console.log("Result:", doc);
          }
        }
      )
        .populate("stocks")
        .clone();
    }

    const stockShares = await Stock.findById(
      newStock ? newStock.id : inputtedStock
    );

    if (stockShares !== 0) {
      stockShares.shares += transaction.shares;
      await stockShares.save();
    } else {
      console.log(stockShares.shares, transaction.shares);
      stockShares.shares += transaction.shares;
      console.log(stockShares.shares, transaction.shares);
      await stockShares.save();
    }
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

async function sellingTransaction(req, res) {
  const { userId } = req.params;
  const { transactionType, inputtedStock, shares, marketPrice, symbol } =
    req.body;

  try {
    // return console.log(
    //   transactionType,
    //   inputtedStock,
    //   shares,
    //   marketPrice,
    //   symbol
    // );
    if (transactionType !== "sell" && transactionType !== "Sell") {
      return res.status(400).json({
        message: "Transaction type is not set to sell!!!",
      });
    }

    let user = await User.findById(userId).populate("stocks");

    if (user) {
      const userStock = user.stocks.find((o) => o.id === inputtedStock);
      const stockId = userStock.id;
      const stockShares = userStock.shares;
      let newAmount;
      let total = marketPrice * shares;

      if (shares <= stockShares) {
        newAmount = stockShares - shares;
      } else {
        return res
          .status(400)
          .json({ message: "Insufficient shares held to sell" });
      }

      const transaction = await Transaction.create({
        type: transactionType,
        symbol: symbol,
        stock: inputtedStock,
        shares: shares,
        price: marketPrice,
        total: total,
      });

      if (transaction) {
        user = await User.findByIdAndUpdate(
          userId,
          [
            {
              $set: {
                buying_power: {
                  $round: [{ $add: ["$buying_power", total] }, 2],
                },
              },
            },

            // {
            //   $set: {
            //     account_value: {
            //       $round: [{ $add: ["$account_value", total] }, 2],
            //     },
            //   },
            // },

            { $set: { transactions: transaction._id } },
          ],

          { new: true },
          function (err, doc) {
            if (err) {
              console.log("Error:", err);
            } else {
              console.log("Result:", doc);
            }
          }
        )
          .populate("stocks")
          .clone();

        if (newAmount !== 0) {
          const stockToBeUpdated = await Stock.findByIdAndUpdate(stockId, {
            shares: newAmount,
          });
          stockToBeUpdated.save();
        } else {
          await Stock.findByIdAndRemove(stockId);
        }

        return res.status(201).json(user);
      } else {
        return res.status(400).json({ message: "Error" });
      }
    }

    return res.status(400).json({ message: "User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await Transaction.find({}).populate("stock");
    if (transactions) {
      return res.status(200).json({ transactions });
    }

    return res.status(404).json({ message: "Transactions not found!!!" });
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  buyingTransaction,
  sellingTransaction,
  getTransactions,
};
