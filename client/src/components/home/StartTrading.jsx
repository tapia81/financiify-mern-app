import React from "react";

export const StartTrading = ({
  Box,
  Typography,
  Button,
  column,
  row,
  sectionBox,
  sectionHeader,
  sectionSubHeader,
  imageBox,
  grouped,
  btnHeader,
  btn,
}) => {
  return (
    <Box
      sx={[
        sectionBox,
        {
          minHeight: {
            xs: "15vh",
            sm: "15vh",
          },
        },
      ]}
    >
      <Typography sx={[sectionHeader, { margin: { lg: "3vw 0" } }]}>
        Get Trading and Have Fun!
      </Typography>
      <Button
        variant="contained"
        sx={[
          btn,
          {
            width: { md: "20vw", lg: "20vw", xl: "10vw" },
            fontSize: {
              xl: "1.3rem",
            },
          },
        ]}
      >
        Let's Go
      </Button>
    </Box>
  );
};
