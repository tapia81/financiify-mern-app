const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Stock = require("./stock");
const Transaction = require("./transaction");

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    account_value: { type: Number, required: true },
    buying_power: { type: Number, required: true },
    stocks: [{ type: Schema.Types.ObjectId, ref: "Stock" }],
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
