const { User } = require("../models/user");

async function createUser(req, res) {
  const { firstName, lastName, email, password, accountValue, buyingPower } =
    req.body;

  try {
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      account_value: accountValue,
      buying_power: buyingPower,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getUserWithStocksAndTransactions(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate("stocks")
      .populate({
        path: "transactions",
        populate: {
          path: "stock",
          model: "Stock",
        },
      });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAccountValue(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("stocks");
    userStocks = user.stocks.map((stock) => {
      return parseFloat((stock.market * stock.shares).toFixed(2));
    });

    const totalHeldStockValue = parseFloat(
      userStocks.reduce((acc, val) => acc + val, 0).toFixed(2)
    );

    user.account_value = totalHeldStockValue + user.buying_power;
    user.save();

    return res.status(200).json({
      account_value: user.account_value,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createUser,
  getUserWithStocksAndTransactions,
  getAccountValue,
};
