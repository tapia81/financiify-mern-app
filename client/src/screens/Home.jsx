import { useRef } from "react";
import { Layout } from "../components/shared/Layout";
import { HowToInvest } from "../components/home/HowToInvest";
import { Fundamentals } from "../components/home/Fundamentals";
import { StartTrading } from "../components/home/StartTrading";
import arrowIcon from "../assets/svgs/arrow-up.svg";
import { Box, Button, Typography } from "@mui/material";

export const Home = ({ screenContainerStyles }) => {
  //screenContainerStyles prop path ==> app.js

  //Initializing refs for each sectiion
  const fundamentalsRef = useRef(null);
  const howToInvestRef = useRef(null);
  const startTradingRef = useRef(null);

  //Scrolls to reference. Function passed through props to each home component.
  const executeScroll = (event, ref) => {
    event.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  //..........................Start of CSS Objects............................//
  const defaultFlexStyles = {
    display: { xs: "flex" },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const sectionHeaderStyles = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    flexWrap: { md: "wrap" },
    justifyContent: { xs: "center", md: "space-evenly" },
    alignItems: "center",
    gap: { xs: "25px", sm: "20px" },
    padding: { xs: "50px 0px", sm: "50px 0 0 0px", md: "50px 0 50px 0px" },
    minHeight: "100vh",
    contain: "content",
  };

  const headerTextStyles = {
    margin: { xs: "0 5vw" },
    textAlign: { xs: "center", md: "left", lg: "center" },
  };

  const subHeaderTextStyles = {
    margin: { xs: "0 5vw" },
    alignSelf: { xs: "center" },
    textAlign: { md: "center" },
    "&::before": {
      content: '"✨Financiify "',
      color: "#6361FA",
    },
    "&::after": {
      content: '"✨"',
    },
    "@media (max-width: 900px) and (orientation: landscape)": {
      fontSize: { sm: "1.8rem" },
    },
  };

  const arrowButtonStyles = {
    margin: { xs: "5vw", md: "10px" },
    height: { xs: "30px", sm: "40px" },
    width: "auto",
    cursor: "pointer",
    transform: "rotate(270deg)",
  };
  //..........................End of CSS Objects..............................//

  return (
    <Layout>
      <Box sx={[screenContainerStyles]}>
        <HowToInvest
          arrowIcon={arrowIcon}
          executeScroll={executeScroll}
          howToInvestRef={howToInvestRef}
          fundamentalsRef={fundamentalsRef}
          defaultFlexStyles={defaultFlexStyles}
          sectionHeaderStyles={sectionHeaderStyles}
          headerTextStyles={headerTextStyles}
          subHeaderTextStyles={subHeaderTextStyles}
          arrowButtonStyles={arrowButtonStyles}
        />

        <Fundamentals
          arrowIcon={arrowIcon}
          executeScroll={executeScroll}
          fundamentalsRef={fundamentalsRef}
          startTradingRef={startTradingRef}
          defaultFlexStyles={defaultFlexStyles}
          sectionHeaderStyles={sectionHeaderStyles}
          headerTextStyles={headerTextStyles}
          arrowButtonStyles={arrowButtonStyles}
        />

        <StartTrading
          arrowIcon={arrowIcon}
          executeScroll={executeScroll}
          howToInvestRef={howToInvestRef}
          startTradingRef={startTradingRef}
          sectionHeaderStyles={sectionHeaderStyles}
          headerTextStyles={headerTextStyles}
          arrowButtonStyles={arrowButtonStyles}
        />
      </Box>
    </Layout>
  );
};
