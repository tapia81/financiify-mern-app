import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useCallback } from "react";
import { Layout } from "../components/shared/Layout";
import { OverviewPanel } from "../components/dashboard/OverviewPanel";
import { BuySellStocks } from "../components/dashboard/BuySellStocks";
import { NewsPanel } from "../components/dashboard/NewsPanel";

function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Dashboard = () => {
  const [panelValue, setPanelValue] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [bestMatches, setBestMatches] = useState();
  const [initialStocks, setInitialStocks] = useState();
  const [accountValue, setAccountValue] = useState();
  const [buyingPower, setBuyingPower] = useState();

  const fetchAccountDetails = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/6421fa239f2813a6c6ff0dad`
    );
    console.log(response.data.buying_power);
    setBuyingPower(response.data.buying_power);
    return response;
  };

  const updateAccountValue = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/6421fa239f2813a6c6ff0dad/account-value`
    );
    const val = response.data.account_value;
    setAccountValue(val.toFixed(2));
    return response;
  };

  fetchAccountDetails();

  const handlePanelChange = (event, newValue) => {
    setPanelValue(newValue);
  };

  const fetchStocks = useCallback(async () => {
    let newArr = [];
    let fixedObj = [];

    const response = await axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
          inputValue ? inputValue : "a"
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
  }, [initialStocks, inputValue]);

  useEffect(() => {
    updateAccountValue();
    fetchStocks();
  }, [fetchStocks]);

  const submitOnEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      fetchStocks();
    }
  };

  const tabPanelBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "100vw",
    width: "100vw",
    marginTop: "3vw",
  };

  const boxColumn = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  };

  const boxRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    maxWidth: "86vw",
    width: "86vw",
    // border: "solid red",
  };

  const card = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: "5vw 0vw", md: "5vw 5vw" },
    maxWidth: "86vw",
    width: "86vw",
  };

  const cardHeader = {
    textAlign: { xs: "center", lg: "center" },
    fontWeight: "bold",
    fontSize: {
      xs: "1.5rem",
      sm: "2rem",
      md: "1.9rem",
      lg: "2rem",
      xl: "3rem",
    },
  };

  const panel = {
    fontSize: {
      xs: "1rem",
      sm: "1.5rem",
      md: "1.3rem",
    },
  };

  return (
    <Layout>
      <Box sx={[tabPanelBox, { margin: { xl: "1vw" } }]}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={panelValue}
            onChange={handlePanelChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} sx={panel} />
            <Tab label="Buy/Sell Stocks" {...a11yProps(1)} sx={panel} />
            <Tab label="News" {...a11yProps(2)} sx={panel} />
          </Tabs>
        </Box>
        <Box sx={tabPanelBox}>
          <TabPanel value={panelValue} index={0}>
            <OverviewPanel
              boxColumn={boxColumn}
              boxRow={boxRow}
              card={card}
              cardHeader={cardHeader}
              accountValue={accountValue}
              buyingPower={buyingPower}
            />
          </TabPanel>
          <TabPanel value={panelValue} index={1}>
            <BuySellStocks
              boxColumn={boxColumn}
              boxRow={boxRow}
              card={card}
              cardHeader={cardHeader}
              setInputValue={setInputValue}
              bestMatches={bestMatches}
              setBestMatches={setBestMatches}
              initialStocks={initialStocks}
              submitOnEnter={submitOnEnter}
              updateAccountValue={updateAccountValue}
            />
          </TabPanel>
          <TabPanel value={panelValue} index={2}>
            <NewsPanel
              boxColumn={boxColumn}
              boxRow={boxRow}
              card={card}
              cardHeader={cardHeader}
              setInputValue={setInputValue}
              bestMatches={bestMatches}
              setBestMatches={setBestMatches}
              initialStocks={initialStocks}
              submitOnEnter={submitOnEnter}
            />
          </TabPanel>
        </Box>
      </Box>
    </Layout>
  );
};
