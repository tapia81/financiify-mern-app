import React from "react";
import axios from "axios";
import { TransactionConfirmation } from "./TransactionConfirmation";
import { useState, useEffect } from "react";
import { Box, Typography, Card, TextField, Button } from "@mui/material";

export const StockSearchCard = ({
  fetchUserHeldStocks,
  userHeldStocks,
  setUserHeldStocks,
  selectedOption,
  optionDetails,
  componentContainerStyles,
  cardContainerStyles,
  fetchStock,
}) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [quantityOfShares, setQuantityOfShares] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [accountValue, setAccountValue] = useState();
  const [stockTransactionData, setStockTransactionData] = useState({
    inputtedStock: null,
    symbol: null,
    name: null,
    transactionType: null,
    shares: 0,
    marketPrice: null,
  });

  const openConfirmation = (event) => {
    setStockTransactionData({
      ...stockTransactionData,
      inputtedStock: null,
      symbol: selectedOption.symbol,
      name: selectedOption.name,
      transactionType: event.target.value,
      shares: quantityOfShares,
      marketPrice: optionDetails.open,
    });
    setTransactionType(event.target.value);
    setConfirmationVisible(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    if (event.target.value === "yes") {
      transactionType === "buy" ? handleTransaction() : handleTransaction();
      setConfirmationVisible(false);
    } else {
      setConfirmationVisible(false);
    }
  };

  const handleTransaction = async () => {
    await axios({
      method: "POST",
      data: stockTransactionData,
      url:
        (transactionType === "buy" || transactionType !== "sell") &&
        stockTransactionData.shares > 0
          ? `${process.env.REACT_APP_API_URL}/api/transactions/6487dc261c3aef71b352e77f/${transactionType}`
          : null,
    }).then(() => {
      setQuantityOfShares(1);
      fetchUserHeldStocks();
    });
  };

  useEffect(() => {
    fetchUserHeldStocks();
  }, [selectedOption]);

  return (
    <Box
      sx={[
        componentContainerStyles,
        {
          minHeight: {
            xs: "20vh",
          },
          height: { xs: "auto" },
          width: { xs: "auto", md: "45%", lg: "40%", xl: "35%" },
        },
      ]}
    >
      <Card
        sx={[
          cardContainerStyles,
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: { xs: "space-evenly" },
            padding: {
              xs: "3vw 5vw",
              sm: "3vw 3vw",
              md: "2vw 2vw",
              xl: "2vw 1vw",
            },
            height: {
              xs: "18vh",
              sm: "23vh",
              md: "25vh",
              xl: "30vh",
            },
            contain: "content",
            width: { xs: "90%", sm: "70%", md: "90%", xl: "70%" },
          },
        ]}
      >
        <Box
          sx={{
            width: "50%",
            textAlign: "start",
          }}
        >
          <Typography variant="h6">{selectedOption.symbol}</Typography>
          <Typography variant="h6">{selectedOption.name}</Typography>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "end",
          }}
        >
          <Typography variant="h6">${optionDetails.price}</Typography>
          <Typography variant="h6">
            {optionDetails["change percent"]}
          </Typography>
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
            onClick={(e) => openConfirmation(e)}
            sx={{
              width: "33%",
            }}
          >
            Buy
          </Button>

          <TextField
            type="number"
            required
            onChange={(e) => setQuantityOfShares(parseInt(e.target.value))}
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
            value={quantityOfShares}
            InputProps={{ inputProps: { min: 1 } }}
          />

          <Button
            value="sell"
            variant="contained"
            color="error"
            onClick={(e) => openConfirmation(e)}
            sx={{
              width: "33%",
            }}
          >
            Sell
          </Button>

          <TransactionConfirmation
            isConfirmationVisible={isConfirmationVisible}
            handleClose={handleClose}
            quantityOfShares={quantityOfShares}
            transactionType={transactionType}
          />
        </Box>
      </Card>
    </Box>
  );
};
