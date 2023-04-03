import * as React from "react";
import manIcon from "../assets/icons/man-icon.png";
import bankIcon from "../assets/icons/bank.png";
import taxesIcon from "../assets/icons/taxes.png";
import stocksIcon from "../assets/icons/stocks.png";
import cryptoIcon from "../assets/icons/crypto.png";
import bankCardImage from "../assets/cardImages/front-shot-of-bank.jpg";
import taxCardImage from "../assets/cardImages/pile-of-tax-forms.jpg";
import stockCardImage from "../assets/cardImages/stock-graph.jpg";
import cryptoCardImage from "../assets/cardImages/pile-of-crypto-coins.jpg";
import { Layout } from "../components/shared/Layout";
import { HowToInvest } from "../components/home/HowToInvest";
import { Fundamentals } from "../components/home/Fundamentals";
import { StartTrading } from "../components/home/StartTrading";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export const Home = () => {
  const homePageButtons = [
    { buttonName: "Financial Planning" },
    { buttonName: "Savings" },
    { buttonName: "Investing" },
    { buttonName: "Credit Basics" },
  ];

  const financialFundamentalTopics = [
    {
      topicName: "Bank Account Types",
      topicImage: bankCardImage,
      imageAlt: "front of bank building",
      icon: bankIcon,
      iconAlt: "bank",
    },
    {
      topicName: "Taxes",
      topicImage: taxCardImage,
      imageAlt: "pile of multiple forms for 2019 tax year",
      icon: taxesIcon,
      iconAlt: "tax check",
    },
    {
      topicName: "Stocks",
      topicImage: stockCardImage,
      imageAlt: "stock graph of highs and lows, no actual numbers",
      icon: stocksIcon,
      iconAlt: "stock graph",
    },
    {
      topicName: "Crypto",
      topicImage: cryptoCardImage,
      imageAlt: "physical version of various crypto coins in a pile",
      icon: cryptoIcon,
      iconAlt: "physical coin & crypto coin",
    },
  ];

  const column = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const row = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const sectionBox = {
    // border: "solid orange",
    display: "flex",
    flexDirection: "column",
    justifyContent: { xs: "flex-start", md: "center" },
    alignItems: { xs: "center", md: "center" },
    minHeight: {
      xs: "60vh",
    },
    width: "100vw",
    maxWidth: "100vw",
  };

  const sectionHeader = {
    // border: "solid blue",
    padding: {
      xs: "10vw 5vw 3vw 5vw",
      sm: "5vw 15vw 3vw 15vw",
      md: "5vw 5vw 3vw 5vw",
      lg: "5vw 5vw 0vw 5vw",
    },
    width: { xs: "100vw", sm: "100vw", md: "50vw" },
    textAlign: "center",
    fontWeight: "bold",
    fontSize: {
      xs: "1.5rem",
      sm: "2rem",
      md: "1.8rem",
      lg: "2rem",
      xl: "3rem",
    },
  };

  const sectionSubHeader = {
    // border: "solid green",
    margin: { md: "1vw 0" },
    textAlign: "center",
    fontWeight: 600,
    fontSize: {
      xs: "1.3rem",
      sm: "1.8rem",
      md: "1.3rem",
      lg: "1.8rem",
      xl: "",
    },
  };

  const imageBox = {
    // border: "solid purple",
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    margin: { xs: "10vw 0", md: "5vw 0" },
    padding: { xs: "0 20vw", sm: "0 30vw", md: "0 5vw" },
    maxWidth: { xs: "100vw", md: "45vw", lg: "40vw" },
  };

  const grouped = {
    // border: "solid red",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    flexWrap: "wrap",
    justifyContent: { xs: "center", sm: "space-evenly", md: "center" },
    alignItems: "center",
    gap: {
      xs: 2,
      sm: 0,
      md: 2,
    },
  };

  const btnHeader = {
    // border: "solid red",
    textAlign: "center",
    fontWeight: 600,
    fontSize: {
      xs: "1rem",
      sm: "1rem",
      md: "0.7rem",
      lg: "",
      xl: "",
    },
  };

  const btn = {
    bgcolor: "primary.light",
    width: { xs: "35vw", sm: "20vw", md: "10vw" },
  };

  return (
    <Layout>
      <HowToInvest
        Box={Box}
        Typography={Typography}
        Button={Button}
        manIcon={manIcon}
        homePageButtons={homePageButtons}
        column={column}
        row={row}
        sectionBox={sectionBox}
        sectionHeader={sectionHeader}
        sectionSubHeader={sectionSubHeader}
        imageBox={imageBox}
        grouped={grouped}
        btnHeader={btnHeader}
        btn={btn}
      />

      <Fundamentals
        Box={Box}
        Typography={Typography}
        Button={Button}
        Card={Card}
        CardActions={CardActions}
        CardContent={CardContent}
        CardMedia={CardMedia}
        financialFundamentalTopics={financialFundamentalTopics}
        column={column}
        row={row}
        sectionBox={sectionBox}
        sectionHeader={sectionHeader}
        sectionSubHeader={sectionSubHeader}
        imageBox={imageBox}
        grouped={grouped}
        btnHeader={btnHeader}
        btn={btn}
      />

      <StartTrading
        Box={Box}
        Typography={Typography}
        Button={Button}
        column={column}
        row={row}
        sectionBox={sectionBox}
        sectionHeader={sectionHeader}
        sectionSubHeader={sectionSubHeader}
        imageBox={imageBox}
        grouped={grouped}
        btnHeader={btnHeader}
        btn={btn}
      />
    </Layout>
  );
};
