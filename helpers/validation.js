require("dotenv").config();
const { Stock } = require("../models/stock");
const checkForStock = (req, res, next) => {
  const { symbol, name } = req.body;
  /*-----------Check-for-existing-User-----------*/
  // const stock = Stock.findOne({
  //   where: { symbol: symbol, name: name },
  // });

  // const stock = await Stock.create({ symbol, name, shares, market });

  stock.then((x) => {
    console.log(x);
    if (x) {
      res.status(404).json({
        message: `An account associated with the email ${x} already exist`,
      });
      return;
    }
    next();
  });
};

module.exports = {
  checkForStock,
};
