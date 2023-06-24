const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    shares: { type: Number, required: true, default: 0 },
    market: { type: String, required: true },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = { Stock };
