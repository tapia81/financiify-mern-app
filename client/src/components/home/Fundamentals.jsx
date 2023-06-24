import React from "react";
import bankIcon from "../../assets/icons/bank.png";
import taxesIcon from "../../assets/icons/taxes.png";
import stocksIcon from "../../assets/icons/stocks.png";
import cryptoIcon from "../../assets/icons/crypto.png";
import bankCardImage from "../../assets/cardImages/front-shot-of-bank.jpg";
import taxCardImage from "../../assets/cardImages/pile-of-tax-forms.jpg";
import stockCardImage from "../../assets/cardImages/stock-graph.jpg";
import cryptoCardImage from "../../assets/cardImages/pile-of-crypto-coins.jpg";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export const Fundamentals = ({
  arrowIcon,
  executeScroll,
  fundamentalsRef,
  startTradingRef,
  defaultFlexStyles,
  sectionHeaderStyles,
  headerTextStyles,
  arrowButtonStyles,
}) => {
  //imported props path ==> screens/home.jsx

  //Initializing topic cards content.
  const financialFundamentalTopics = [
    {
      topicName: "Bank Account Types",
      topicImage: bankCardImage,
      imageAlt: "front of bank building",
      icon: bankIcon,
      iconAlt: "bank",
      cardText:
        "Accounts offered by banks, such as checking accounts, savings accounts, money market accounts, and certificates of deposit (CDs).",
    },
    {
      topicName: "Taxes",
      topicImage: taxCardImage,
      imageAlt: "pile of multiple forms for 2019 tax year",
      icon: taxesIcon,
      iconAlt: "tax check",
      cardText:
        "Paying taxes to the government based on your income and other financial factors. It involves understanding concepts such as taxable income, deductions, credits, and the various tax forms and deadlines.",
    },
    {
      topicName: "Stocks",
      topicImage: stockCardImage,
      imageAlt: "stock graph of highs and lows, no actual numbers",
      icon: stocksIcon,
      iconAlt: "stock graph",
      cardText:
        "Investing in stocks involves buying and selling shares of a company with the aim of generating a return on investment.",
    },
    {
      topicName: "Crypto",
      topicImage: cryptoCardImage,
      imageAlt: "physical version of various crypto coins in a pile",
      icon: cryptoIcon,
      iconAlt: "physical coin & crypto coin",
      cardText:
        "Short for cryptocurrency, this refers to digital currencies that use cryptography for security. Cryptocurrencies, such as Bitcoin, Ethereum, and Litecoin, operate on decentralized networks called blockchains.",
    },
  ];

  //..........................Start of CSS Objects............................//
  const cardActionText = {
    textAlign: "left",
    selfAlign: "start",
    contain: "content",
    overflow: "hidden",
  };
  //..........................End of CSS Objects..............................//

  return (
    <Box
      ref={fundamentalsRef}
      sx={[sectionHeaderStyles, { bgcolor: "#FFF9EC" }]}
    >
      <Typography variant="h2" sx={headerTextStyles}>
        Fundamentals of Financial Literacy
      </Typography>

      <Box
        sx={[
          defaultFlexStyles,
          {
            flexDirection: { md: "row" },
            flexWrap: { md: "wrap" },
            gap: { xs: "10vw", md: "5vw", lg: "1vw" },
            margin: {
              xs: "20px 0",
              sm: "50px 0",
              lg: "50px 10px",
              xl: "70px 20px",
            },
          },
        ]}
      >
        {financialFundamentalTopics.map((topic, key) => {
          return (
            <Card
              key={key}
              sx={{
                margin: { xs: "0vw 5vw", md: "0vw 0vw" },
                height: {
                  xs: "450px",
                  sm: "700px",
                  md: "550px",
                  lg: "500px",
                  xl: "570px",
                },
                maxWidth: {
                  xs: "86%",
                  sm: "75%",
                  md: "40%",
                  lg: "23.5%",
                },
              }}
            >
              <CardMedia
                sx={{
                  height: { xs: "40%", lg: "35%" },
                  contain: "content",
                }}
                image={topic.topicImage}
                title={topic.topicName}
                alt={topic.imageAlt}
              />

              <CardContent
                sx={[
                  defaultFlexStyles,
                  {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    padding: { sm: "4% 4%", lg: "7% 7%" },
                    height: { xs: "60%", lg: "65%" },
                  },
                ]}
              >
                <Box
                  component="img"
                  sx={{
                    height: {
                      xs: "35px",
                      sm: "60px",
                      md: "40px",
                      lg: "30px",
                      xl: "50px",
                    },
                    maxHeight: { xs: "250px", sm: "50vw" },
                  }}
                  src={topic.icon}
                  alt={topic.iconAlt}
                ></Box>

                <Typography
                  variant="h5"
                  component="div"
                  sx={[
                    {
                      textAlign: "start",
                      padding: "2% 0",
                      height: "auto",
                      contain: "content",
                    },
                  ]}
                >
                  {topic.topicName}
                </Typography>

                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={[
                    cardActionText,
                    {
                      height: { xs: "50%", lg: "65%" },
                    },
                  ]}
                >
                  {topic.cardText}
                </Typography>

                <CardActions
                  sx={{
                    margin: { xs: "6% 0 0 0", sm: "6% 0 0 0" },
                    padding: 0,
                    height: "5%",
                    width: "100%",
                  }}
                >
                  {/* <Button size="small" sx={cardActionText}>
                    Share
                  </Button> */}
                  <Button size="small" sx={cardActionText}>
                    <Typography variant="h4" sx={{ fontWeight: "600" }}>
                      Learn More
                    </Typography>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Arrow svg to call executeScroll function onclick.*/}
      <Box
        component="img"
        src={arrowIcon}
        onClick={(e) => executeScroll(e, startTradingRef)}
        sx={arrowButtonStyles}
      ></Box>
    </Box>
  );
};
