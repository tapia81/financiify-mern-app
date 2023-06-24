import React from "react";
import axios from "axios";
import { TransactionConfirmation } from "./TransactionConfirmation";
import { useState, useEffect } from "react";
import { Box, Typography, Card, TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const OwnedStocks = ({
  fetchUserHeldStocks,
  userHeldStocks,
  setUserHeldStocks,
  loaderBox,
  componentContainerStyles,
  cardContainerStyles,
}) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [quantityOfShares, setQuantityOfShares] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [stockTransactionData, setStockTransactionData] = useState({
    inputtedStock: null,
    symbol: null,
    name: null,
    transactionType: null,
    shares: 0,
    marketPrice: null,
  });

  const openConfirmation = (event, stock) => {
    // console.log(stock._id);
    setStockTransactionData({
      ...stockTransactionData,
      inputtedStock: stock._id ? stock._id : null,
      symbol: stock.symbol,
      name: stock.name,
      transactionType: event.target.value,
      shares: stock.sharesForTransaction,
      marketPrice: stock.market,
    });
    setTransactionType(event.target.value);
    setConfirmationVisible(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    if (event.target.value === "yes") {
      transactionType === "buy" || transactionType === "sell"
        ? handleTransaction()
        : handleTransaction();
      setConfirmationVisible(false);
    } else {
      setConfirmationVisible(false);
    }
  };

  const handleTransaction = async () => {
    // console.log(stockTransactionData);
    await axios({
      method: "POST",
      data: stockTransactionData,
      url:
        transactionType === "buy" || transactionType !== "sell"
          ? `${process.env.REACT_APP_API_URL}/api/transactions/6487dc261c3aef71b352e77f/${transactionType}`
          : null,
    }).then(() => {
      setQuantityOfShares(1);
      fetchUserHeldStocks();
    });
  };

  const handleUpdate = (_id, newValue) => {
    setUserHeldStocks((prevData) =>
      prevData.map((object) =>
        object._id === _id
          ? { ...object, sharesForTransaction: newValue }
          : object
      )
    );
  };

  useEffect(() => {
    fetchUserHeldStocks();
  }, []);

  return (
    <Box
      sx={[
        componentContainerStyles,
        {
          flexDirection: { sm: "column" },
          justifyContent: { xs: "flex-start" },
          minHeight: {
            xs: "20vh",
          },
          height: { xs: "auto" },
        },
      ]}
    >
      <Typography variant="h3">Manage Stocks</Typography>
      {userHeldStocks.length > 0 && userHeldStocks !== null ? (
        <Box
          sx={[
            componentContainerStyles,
            {
              display: "grid",
              flexDirection: { sm: "row" },
              flexWrap: { sm: "wrap", lg: "nowrap" },
              justifyContent: "space-evenly",
              justifyItems: "center",
              alignContent: "space-evenly",
              alignItems: "center",
              height: { xs: "auto" },
              minHeight: {
                xs: "20vh",
              },
              gridTemplateColumns: {
                sm: "repeat(auto-fill, 48%)",
              },
              "@media (orientation: landscape)": {
                gridTemplateColumns: {
                  md: "repeat(auto-fill, 45%)",
                  lg: "repeat(auto-fill, 30%)",
                  xl: "repeat(auto-fill, 23%)",
                },
              },
            },
          ]}
        >
          {userHeldStocks.map((stock) => {
            return (
              <Card
                key={stock._id}
                sx={[
                  cardContainerStyles,
                  {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: { xs: "space-evenly" },
                    padding: {
                      xs: "5vw 5vw",
                      sm: "3vw 3vw",
                      md: "2vw 2vw",
                      xl: "2vw 1vw",
                    },
                    height: {
                      xs: "18vh",
                      sm: "20vh",
                      md: "25vh",
                    },
                    width: { xs: "90%", sm: "100%", md: "80%", xl: "90%" },
                    contain: "content",
                  },
                ]}
              >
                <Box sx={{ width: "50%", textAlign: "start" }}>
                  <Typography variant="h6">{stock.symbol}</Typography>
                  <Typography variant="h6">{stock.shares} shares</Typography>
                </Box>
                <Box sx={{ width: "50%", textAlign: "end" }}>
                  <Typography variant="h6">${stock.market}</Typography>
                  <Typography variant="h6">${stock.market}</Typography>
                </Box>

                <Box
                  sx={[
                    {
                      display: "flex",
                      justifyContent: "space-evenly",
                      gap: 0,
                      width: "100%",
                    },
                  ]}
                >
                  <Button
                    value="buy"
                    variant="contained"
                    color="success"
                    onClick={(e) => openConfirmation(e, stock)}
                    sx={{
                      width: "33%",
                    }}
                  >
                    Buy
                  </Button>

                  <TextField
                    type="number"
                    required
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      newValue > stock.shares
                        ? handleUpdate(stock._id, stock.shares)
                        : handleUpdate(stock._id, newValue);
                    }}
                    sx={{
                      width: "33%",
                      margin: 0,
                      margin: "0px 20px",
                      objectFit: "cover",
                      textAlign: "center",
                      alignItems: "center",
                      contain: "content",
                      "& input": {
                        textAlign: "center",
                      },
                    }}
                    value={
                      stock.sharesForTransaction
                        ? stock.sharesForTransaction
                        : null
                    }
                    InputProps={{ inputProps: { min: 1, max: stock.shares } }}
                  />

                  <Button
                    value="sell"
                    variant="contained"
                    color="error"
                    onClick={(e) => openConfirmation(e, stock)}
                    sx={{
                      width: "33%",
                    }}
                  >
                    Sell
                  </Button>
                </Box>
              </Card>
            );
          })}

          <TransactionConfirmation
            isConfirmationVisible={isConfirmationVisible}
            handleClose={handleClose}
            quantityOfShares={stockTransactionData.shares}
            transactionType={transactionType}
          />
        </Box>
      ) : (
        <Box
          sx={[
            loaderBox,
            {
              minHeight: "90vh",
            },
          ]}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
