const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const userRouter = require("./routes/user");
const stockRouter = require("./routes/stock");
const transactionRouter = require("./routes/transaction");

const app = express();

const PORT = process.env.PORT || 3001;
const corsOptions = {
  "Access-Control-Allow-Origin": `http://localhost:${PORT}`,
};
app.use(cors());
// app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Financiify Server!");
});

app.use("/api", userRouter, stockRouter, transactionRouter);

module.exports = app;
