const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Stock = require("./stock");

const transactionSchema = new Schema(
  {
    type: { type: String, required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    stock: { type: Schema.Types.ObjectId, ref: "Stock" },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
