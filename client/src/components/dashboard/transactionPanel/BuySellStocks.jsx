import { useState, useEffect, useCallback } from "react";
import { StockSearchCard } from "./StockSearchCard";
import { OwnedStocks } from "./OwnedStocks";
import { Box, Typography, TextField, Autocomplete } from "@mui/material";
import axios from "axios";

export const BuySellStocks = ({
  boxRow,
  componentContainerStyles,
  cardContainerStyles,
  cardHeader,
  cardSubHeader,
  loaderBox,
}) => {
  const [userHeldStocks, setUserHeldStocks] = useState([]);
  const [bestMatches, setBestMatches] = useState([]);
  const [optionDetails, setOptionDetails] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const fetchUserHeldStocks = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/stocks`
    );
    const moddedData = response.data.stocks.map((stock) => ({
      ...stock,
      sharesForTransaction: 1,
    }));
    return setUserHeldStocks(moddedData);
  };

  const fetchStock = async () => {
    const response = await axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectedOption.symbol}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
      )
      .then((res) => {
        console.log(res);
        const updatedObject = {};
        if (res.data) {
          console.log(res.data);
          const originalObject = res.data[`Global Quote`];

          for (const key in originalObject) {
            if (originalObject.hasOwnProperty(key)) {
              const cleanedKey = key.replace(/^\d+\.\s*/, "");
              updatedObject[cleanedKey] = originalObject[key];
            }
          }
          setOptionDetails(updatedObject);
        }
      });

    return response;
  };

  const fetchStockList = async (value) => {
    const searchValue = value;
    setBestMatches([]);
    const response = await axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          searchValue ? searchValue : "a"
        }&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
      )
      .then((res) => {
        const originalList = res.data.bestMatches;
        originalList.map((stock) => {
          let updatedObject = {};
          for (const key in stock) {
            if (stock.hasOwnProperty(key)) {
              const cleanedKey = key.replace(/^\d+\.\s*/, "");
              updatedObject[cleanedKey] = stock[key];
            }
          }
          setBestMatches((prevArray) => [...prevArray, updatedObject]);
        });
      });

    return response;
  };

  useEffect(() => {
    if (selectedOption) {
      fetchStock();
    }
  }, [selectedOption]);

  return (
    <Box
      sx={[
        componentContainerStyles,
        {
          flexDirection: { sm: "column" },
          justifyContent: { xs: "flex-start" },
        },
      ]}
    >
      <Typography sx={[cardHeader]}>Search</Typography>
      <Autocomplete
        id="asynchronous-demo"
        sx={{
          width: { xs: 300, sm: 500 },
        }}
        options={bestMatches}
        getOptionLabel={(option) => (option.name ? option.name : option.symbol)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event, value) => {
          if (value) {
            setSelectedOption(value);
          }
        }}
        onInputChange={(event, value) => fetchStockList(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Symbol"
            sx={{
              width: { xs: 300, sm: 500 },
            }}
          />
        )}
      />

      {optionDetails ? (
        <StockSearchCard
          fetchUserHeldStocks={fetchUserHeldStocks}
          userHeldStocks={userHeldStocks}
          setUserHeldStocks={setUserHeldStocks}
          selectedOption={selectedOption}
          optionDetails={optionDetails}
          componentContainerStyles={componentContainerStyles}
          cardContainerStyles={cardContainerStyles}
        />
      ) : null}

      <OwnedStocks
        fetchUserHeldStocks={fetchUserHeldStocks}
        userHeldStocks={userHeldStocks}
        setUserHeldStocks={setUserHeldStocks}
        loaderBox={loaderBox}
        componentContainerStyles={componentContainerStyles}
        cardContainerStyles={cardContainerStyles}
      />
    </Box>
  );
};
