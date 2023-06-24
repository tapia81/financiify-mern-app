import React from "react";
import manIcon from "../../assets/icons/man-icon.png";
import { Box, Button, Typography, Grid } from "@mui/material";
export const HowToInvest = ({
  arrowIcon,
  executeScroll,
  howToInvestRef,
  fundamentalsRef,
  defaultFlexStyles,
  sectionHeaderStyles,
  headerTextStyles,
  subHeaderTextStyles,
  arrowButtonStyles,
}) => {
  //imported props path ==> screens/home.jsx

  //Initializing button name. Object to include other fields like links.
  const homePageButtons = [
    { buttonName: "Financial Planning" },
    { buttonName: "Savings" },
    { buttonName: "Investing" },
    { buttonName: "Credit Basics" },
  ];

  return (
    <Box
      ref={howToInvestRef}
      sx={[
        sectionHeaderStyles,
        {
          bgcolor: "#EDF2FB",
          padding: {
            xs: "50px 0px",
            sm: "20px 0 0 0px",
            md: "0px 0 70px 0px",
            xl: "0px 0 100px 0px",
          },
        },
      ]}
    >
      <Box
        sx={[
          defaultFlexStyles,
          {
            gap: { xs: "10px", md: "25px" },
            margin: { md: "0 0 0 20px" },
            width: { md: "46%", xl: "51%" },
          },
        ]}
      >
        <Typography variant="h2" sx={headerTextStyles}>
          Learning How To Invest Is Hard Enough
        </Typography>

        <Typography variant="h3" sx={subHeaderTextStyles}>
          Simplifies This
        </Typography>

        {/*Renders buttons below the header text for desktop screens  */}
        <Grid
          container
          spacing={2}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            width: { md: "100%" },
            gap: 0,
            margin: 0,
          }}
        >
          {homePageButtons.map((button, key) => {
            return (
              <Grid item key={key} md={5} xl={3} sx={defaultFlexStyles}>
                <Button
                  variant="contained"
                  sx={{
                    padding: "10px",
                    height: { md: "50px" },
                    width: { md: "100%" },
                  }}
                >
                  <Typography variant="h4">{button.buttonName}</Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box
        component="img"
        src={manIcon}
        alt="Guy sitting"
        sx={{
          height: { xs: "200px", sm: "400px", md: "500px", xl: "600px" },
          width: { xs: "60vw", sm: "50vw", md: "39vw", lg: "40vw", xl: "36%" },
          margin: { xs: "5vw" },
        }}
      ></Box>

      {/*Renders buttons below the image for mobile screens  */}
      <Grid
        container
        spacing={2}
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "30vw", sm: "0" },
          width: { xs: "90vw" },
          gap: "1vw",
        }}
      >
        {homePageButtons.map((button, key) => {
          return (
            <Grid item key={key} xs={8} sm={5} sx={defaultFlexStyles}>
              <Button
                variant="contained"
                sx={{
                  padding: "10px",
                  height: { xs: "10vw", sm: "60px" },
                  width: { xs: "100%" },
                }}
              >
                <Typography variant="h4">{button.buttonName}</Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {/* Arrow svg to call executeScroll function onclick.*/}
      <Box
        component="img"
        src={arrowIcon}
        onClick={(e) => executeScroll(e, fundamentalsRef)}
        sx={arrowButtonStyles}
      ></Box>
    </Box>
  );
};
