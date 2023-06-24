import React from "react";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StartTrading = ({
  arrowIcon,
  executeScroll,
  howToInvestRef,
  startTradingRef,
  sectionHeaderStyles,
  headerTextStyles,
  arrowButtonStyles,
}) => {
  //imported props path ==> screens/home.jsx

  //Rotating the last chevron arrow to indicate direction
  const rotateArrow = keyframes`
  from {
		transform: rotate(270);
		transform-origin: center;  }
  to {
	  transform: rotate(90deg);
		transform-origin: center;  }
`;

  return (
    <Box
      ref={startTradingRef}
      sx={[
        sectionHeaderStyles,
        {
          bgcolor: "#FBF5FF",
          flexDirection: { xs: "column" },
          justifyContent: { xs: "center" },
          padding: { xs: "50px 30px" },
        },
      ]}
    >
      <Typography variant="h2" sx={[headerTextStyles]}>
        Get Trading and Have Fun!
      </Typography>

      <NavLink to="/dashboard">
        <Button
          variant="contained"
          sx={{
            padding: { xs: "15px 40px", sm: "20px 60px", sm: "15px 50px" },
          }}
        >
          <Typography variant="h4">Let's Go</Typography>
        </Button>
      </NavLink>

      {/* Arrow svg to call executeScroll function onclick.*/}
      <Box
        component="img"
        src={arrowIcon}
        onClick={(e) => executeScroll(e, howToInvestRef)}
        sx={[
          arrowButtonStyles,
          {
            position: "absolute",
            top: { xs: 700, sm: 1000, md: 700, lg: 750, xl: 800 },
            animation: {
              xs: `${rotateArrow} 1s ease 0s 1 normal forwards`,
              lg: "none",
            },
            "&:hover": {
              animation: { lg: `${rotateArrow} 1s ease 0s 1 normal forwards` },
            },
          },
        ]}
      ></Box>
    </Box>
  );
};
