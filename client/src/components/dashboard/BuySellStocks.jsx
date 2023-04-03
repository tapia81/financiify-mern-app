import axios from "axios";
import { useState, useEffect } from "react";
import { TransactionConfirmation } from "./TransactionConfirmation";
import {
  Box,
  Typography,
  Card,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

export const BuySellStocks = ({
  boxColumn,
  boxRow,
  card,
  cardHeader,
  setInputValue,
  bestMatches,
  setBestMatches,
  initialStocks,
  submitOnEnter,
  updateAccountValue,
}) => {
  const [open, setOpen] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const options = bestMatches ? bestMatches : initialStocks;
  const [inputValue, setInputValue2] = useState({});
  const [selectedStock, setSelectedStock] = useState({});
  const [selectedStock2, setSelectedStock2] = useState();
  const [userStocks, setUserStocks] = useState([]);
  const [stockAmount, setStockAmount] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [stockToPurchase, setStockToPurchase] = useState({
    inputtedStock: null,
    symbol: null,
    name: null,
    inputtedType: null,
    inputtedShares: 0,
    marketPrice: null,
  });

  const handleClickOpen = (event) => {
    event.preventDefault();
    setConfirmationVisible(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log(selectedStock2);
    if (event.target.value === "yes") {
      transactionType === "buy" ? buyStock(selectedStock2.open) : sellStock();
      setConfirmationVisible(false);
    } else {
      setConfirmationVisible(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setBestMatches([]);
    }
  }, [open, setBestMatches]);

  useEffect(() => {
    setSelectedStock(
      options.find((o) => (o.name === inputValue ? inputValue : null))
    );
  }, [inputValue, options]);

  let newArr = [];

  const fetchStock = async () => {
    let finalObj = {};

    const response = await axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${
          selectedStock.symbol ? selectedStock.symbol : "a"
        }&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
      )
      .then((res) => {
        let fetchedStock = res.data["Time Series (Daily)"];
        const latestStockDetails = fetchedStock[Object.keys(fetchedStock)[0]];

        const replacements = {
          "1. open": "open",
          "2. high": "high",
          "3. low": "low",
          "4. close": "close",
          "5. adjusted close": "adjusted close",
          "6. volume": "volume",
          "7. dividend amount": "dividend amount",
          "8. split coefficient": "split coefficient",
        };

        newArr.push(
          Object.keys(latestStockDetails).map((e) => {
            const newKey = replacements[e] || e;
            return { [newKey]: latestStockDetails[e] };
          })
        );

        if (newArr) {
          newArr.map((obj) => {
            for (let i = 0; i < obj.length; i++) {
              Object.assign(finalObj, obj[i]);
            }
          });
        }
      });

    setSelectedStock2(finalObj);
    return response;
  };

  const fetchUserHeldStocks = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URI}/api/stocks`
    );

    return setUserStocks(response.data.stocks);
  };

  const buyStock = async (market) => {
    await axios({
      method: "POST",
      data: stockToPurchase,
      url: `${process.env.REACT_APP_LOCAL_URI}/api/transactions/6421fa239f2813a6c6ff0dad/buy`,
    }).then(() => {
      setStockAmount(1);
      fetchUserHeldStocks();
      updateAccountValue();
    });
  };

  const sellStock = async () => {
    await axios({
      method: "POST",
      data: stockToPurchase,
      url: `${process.env.REACT_APP_LOCAL_URI}/api/transactions/6421fa239f2813a6c6ff0dad/sell`,
    }).then(() => {
      setStockAmount(1);
      fetchUserHeldStocks();
      updateAccountValue();
    });
  };

  useEffect(() => {
    const fetchPromise = fetchStock();
    fetchUserHeldStocks();
  }, [selectedStock]);

  const buyStockCardContent = {
    textAlign: { xs: "center", lg: "center" },
    fontSize: {
      xs: "1.5rem",
      sm: "2.5rem",
      md: "1.9rem",
      lg: "2rem",
      xl: "3rem",
    },
  };

  const renderSelectedStock = (x, y) => {
    if (x && y) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: " 100%",
          }}
        >
          <Box>
            <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
              Name
            </Typography>
            <Typography sx={buyStockCardContent}>{x.name}</Typography>
          </Box>
          <Box>
            <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
              Symbol
            </Typography>
            <Typography sx={buyStockCardContent}>{x.symbol}</Typography>
          </Box>
          <Box>
            <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
              High
            </Typography>
            <Typography sx={buyStockCardContent}>{y.high}</Typography>
          </Box>
          <Box>
            <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
              Low
            </Typography>
            <Typography sx={buyStockCardContent}>{y.low}</Typography>
          </Box>

          <Box
            sx={[
              boxRow,
              { display: "flex", justifyContent: "space-evenly", gap: 0 },
            ]}
          >
            <Button
              value="buy"
              variant="contained"
              color="success"
              sx={{ width: "30%", margin: "0 5vw" }}
              onClick={(e) => {
                setStockToPurchase({
                  ...stockToPurchase,
                  inputtedStock: null,
                  symbol: x.symbol,
                  name: x.name,
                  inputtedType: e.target.value,
                  inputtedShares: stockAmount,
                  marketPrice: y.open,
                });
                setTransactionType(e.target.value);
                handleClickOpen(e);
              }}
            >
              Buy
            </Button>
            <TextField
              onChange={(e) => setStockAmount(e.target.value)}
              sx={{ width: "25%", margin: 0, padding: 0 }}
              value={stockAmount}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />

            <Button
              value="sell"
              variant="contained"
              color="error"
              sx={{ width: "30%", margin: "0 5vw" }}
              onClick={(e) => {
                setStockToPurchase({
                  ...stockToPurchase,
                  inputtedStock: null,
                  inputtedType: e.target.value,
                  symbol: x.symbol,
                  inputtedShares: stockAmount,
                  marketPrice: y.open,
                });

                setTransactionType(e.target.value);
                handleClickOpen(e);
              }}
            >
              Sell
            </Button>
            <TransactionConfirmation
              isConfirmationVisible={isConfirmationVisible}
              setConfirmationVisible={setConfirmationVisible}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              stockAmount={stockAmount}
              transactionType={transactionType}
            />
          </Box>
        </Box>
      );
    }
  };

  if (options) {
    return (
      <Box sx={boxColumn}>
        <Card
          sx={[
            card,
            {
              justifyContent: "space-evenly",
            },
          ]}
        >
          <Typography sx={cardHeader}>Search</Typography>
          <Autocomplete
            id="asynchronous-demo"
            sx={{ minHeight: "20vw", width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            options={options}
            getOptionLabel={(option) =>
              option.name ? option.name : option.symbol
            }
            onInputChange={(event, newInputValue) => {
              setInputValue2(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Symbol"
                onKeyDown={(e) => submitOnEnter(e)}
                onChange={(e) => setInputValue(e.target.value)}
              />
            )}
          />
          {renderSelectedStock(selectedStock, selectedStock2)}
        </Card>
        <Typography sx={cardHeader}>Manage Stocks</Typography>
        {userStocks.map((stock, key) => {
          return (
            <Card sx={[card]} key={key}>
              <Box>
                <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
                  Name
                </Typography>
                <Typography sx={buyStockCardContent}>{stock.name}</Typography>
              </Box>

              <Box>
                <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
                  Symbol
                </Typography>
                <Typography sx={buyStockCardContent}>{stock.symbol}</Typography>
              </Box>

              <Box>
                <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
                  Market Price
                </Typography>
                <Typography sx={buyStockCardContent}>{stock.market}</Typography>
              </Box>

              <Box>
                <Typography sx={[cardHeader, { textDecoration: "underline" }]}>
                  Shares
                </Typography>
                <Typography sx={buyStockCardContent}>{stock.shares}</Typography>
              </Box>

              <Box
                sx={[
                  boxRow,
                  { display: "flex", justifyContent: "space-evenly", gap: 0 },
                ]}
              >
                <Button
                  value="buy"
                  variant="contained"
                  color="success"
                  sx={{ width: "30%", margin: "0 5vw" }}
                  onClick={(e) => {
                    setStockToPurchase({
                      ...stockToPurchase,
                      inputtedStock: stock._id,
                      symbol: stock.symbol,
                      name: stock.name,
                      inputtedType: e.target.value,
                      inputtedShares: stockAmount,
                      marketPrice: stock.market,
                    });
                    setTransactionType(e.target.value);
                    handleClickOpen(e);
                  }}
                >
                  Buy
                </Button>
                <TextField
                  onChange={(e) => setStockAmount(e.target.value)}
                  sx={{ width: "25%", margin: 0, padding: 0 }}
                  value={stockAmount}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />

                <Button
                  value="sell"
                  variant="contained"
                  color="error"
                  sx={{ width: "30%", margin: "0 5vw" }}
                  onClick={(e) => {
                    setStockToPurchase({
                      ...stockToPurchase,
                      inputtedStock: stock._id,
                      inputtedType: e.target.value,
                      symbol: stock.symbol,
                      inputtedShares: stockAmount,
                      marketPrice: stock.market,
                    });
                    setTransactionType(e.target.value);
                    handleClickOpen(e);
                  }}
                >
                  Sell
                </Button>
                <TransactionConfirmation
                  isConfirmationVisible={isConfirmationVisible}
                  setConfirmationVisible={setConfirmationVisible}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  stockAmount={stockAmount}
                  transactionType={transactionType}
                />
              </Box>
            </Card>
          );
        })}
      </Box>
    );
  }
};
