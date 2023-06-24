import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { Layout } from "../components/shared/Layout";
import { OverviewPanel } from "../components/dashboard/overviewPanel/OverviewPanel";
import { BuySellStocks } from "../components/dashboard/transactionPanel/BuySellStocks";
import { NewsPanel } from "../components/dashboard/newsPanel/NewsPanel";

export const Dashboard = ({ screenContainerStyles }) => {
  //screenContainerStyles prop path ==> app.js

  const [panelValue, setPanelValue] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [bestMatches, setBestMatches] = useState();
  const [initialStocks, setInitialStocks] = useState();
  const [accountValue, setAccountValue] = useState();
  const [buyingPower, setBuyingPower] = useState();
  const [searchValue, setSearchValue] = useState({});

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: { xs: 2, sm: 5 } }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handlePanelChange = (event, newValue) => {
    setPanelValue(newValue);
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  //fetches account value and buying power
  const fetchAccountValues = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/6487dc261c3aef71b352e77f`
    );
    setAccountValue(response.data.account_value.toFixed(2));
    setBuyingPower(response.data.buying_power.toFixed(2));
    return response;
  };

  const fetchStockSearchList = useCallback(async () => {
    let newArr = [];
    let fixedObj = [];

    const response = await axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          Object.keys(searchValue).length > 0 ? searchValue : "a"
        }&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
      )
      .then((res) => {
        const replacements = {
          "1. symbol": "symbol",
          "2. name": "name",
          "3. type": "type",
          "4. region": "region",
          "5. marketOpen": "marketOpen",
          "6. marketClose": "marketClose",
          "7. timezone": "timezone",
          "8. currency": "currency",
          "9. matchScore": "matchScore",
        };

        res.data.bestMatches.map((oldKeyField) => {
          newArr.push(
            Object.keys(oldKeyField).map((e) => {
              const newKey = replacements[e] || e;
              return { [newKey]: oldKeyField[e] };
            })
          );
          return newArr;
        });

        if (newArr) {
          newArr.map((obj) => {
            let finalObj = {};
            for (let i = 0; i < obj.length; i++) {
              Object.assign(finalObj, obj[i]);
            }

            if (fixedObj.indexOf(finalObj) === -1) {
              fixedObj.push(finalObj);
            }
            return newArr;
          });
        }

        if (!initialStocks) {
          setInitialStocks(fixedObj);
        } else {
          setBestMatches(fixedObj);
        }
      });

    return response;
  }, [initialStocks, searchValue]);

  const submitOnEnter = (event) => {
    event.preventDefault();
    if (event.keyCode === 13 || event.type == "select") {
      // fetchStocks();
    }
  };

  useEffect(() => {
    fetchAccountValues();
    fetchStockSearchList();
  }, [fetchStockSearchList]);

  //..........................Start of CSS Objects............................//
  const defaultFlexStyles = {
    display: { xs: "flex" },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: { xs: "80vh", md: "105vh", lg: "75vh", xl: "78vh" },
    width: "100%",
  };

  const loaderBox = {
    display: { xs: "flex" },
    flexDirection: { xs: "column", md: "row" },
    flexWrap: { xs: "nowrap", md: "wrap" },
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxWidth: { xs: "100%", md: "100vw" },
    width: { xs: "100%" },
    contain: "content",
  };

  const tabPanel = {
    height: { sm: "90px" },
    maxWidth: { md: "33.3%" },
    width: "33.3%",
    fontSize: {
      xs: "0.9rem",
      sm: "1.5rem",
      md: "1.3rem",
    },
  };

  const componentContainerStyles = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: { xs: "flex-start", sm: "center" },
    alignItems: "center",
    gap: { xs: 3 },
    padding: 0,
    margin: 0,
    minHeight: "90vh",
    maxWidth: "100%",
    width: "100%",
  };

  const cardContainerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: { xs: "flex-start", md: "center" },
    alignItems: "center",
    padding: { xs: "0 0" },
    maxWidth: "100%",
    width: "100%",
    boxShadow:
      "rgba(67, 71, 85, 0.47) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
  };

  const cardHeader = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: { xs: "center", lg: "center" },
  };

  const cardSubHeader = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: { xs: "center", lg: "center" },
  };
  //..........................End of CSS Objects..............................//

  return (
    <Layout>
      <Box sx={screenContainerStyles}>
        <Tabs
          component="div"
          aria-label="basic tabs example"
          value={panelValue}
          onChange={handlePanelChange}
        >
          <Tab label="Overview" {...a11yProps(0)} sx={tabPanel} />
          <Tab label="Buy/Sell Stocks" {...a11yProps(1)} sx={tabPanel} />
          <Tab label="News" {...a11yProps(2)} sx={tabPanel} />
        </Tabs>

        <TabPanel value={panelValue} index={0}>
          <OverviewPanel
            accountValue={accountValue}
            buyingPower={buyingPower}
            defaultFlexStyles={defaultFlexStyles}
            loaderBox={loaderBox}
            componentContainerStyles={componentContainerStyles}
            cardContainerStyles={cardContainerStyles}
            cardHeader={cardHeader}
            cardSubHeader={cardSubHeader}
          />
        </TabPanel>

        <TabPanel value={panelValue} index={1}>
          <BuySellStocks
            componentContainerStyles={componentContainerStyles}
            cardContainerStyles={cardContainerStyles}
            cardHeader={cardHeader}
            cardSubHeader={cardSubHeader}
            setInputValue={setInputValue}
            bestMatches={bestMatches}
            setBestMatches={setBestMatches}
            initialStocks={initialStocks}
            submitOnEnter={submitOnEnter}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loaderBox={loaderBox}
          />
        </TabPanel>

        <TabPanel value={panelValue} index={2}>
          <NewsPanel
            defaultFlexStyles={defaultFlexStyles}
            loaderBox={loaderBox}
            componentContainerStyles={componentContainerStyles}
            cardContainerStyles={cardContainerStyles}
            cardHeader={cardHeader}
            cardSubHeader={cardSubHeader}
          />
        </TabPanel>
      </Box>
    </Layout>
  );
};
