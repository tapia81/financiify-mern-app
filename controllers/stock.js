const { Stock } = require("../models/stock");
const { User } = require("../models/user");

async function createStock(req, res) {
  const { userId } = req.params;
  const { symbol, name, shares, market } = req.body;

  try {
    const stock = await Stock.create({ symbol, name, shares, market });
    if (stock) {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { stocks: stock._id } },
        { new: true }
      ).populate("stocks");
      res.status(201).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getStocks(req, res) {
  try {
    const stocks = await Stock.find({});
    if (stocks) {
      return res.status(200).json({ stocks });
    }

    return res.status(404).json({ message: "Stocks not found!!!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createStock,
  getStocks,
};
