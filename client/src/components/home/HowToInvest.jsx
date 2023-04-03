import React from "react";

export const HowToInvest = ({
  Box,
  Typography,
  Button,
  manIcon,
  homePageButtons,
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
          flexDirection: { xs: "column", md: "row" },
          padding: { xl: "2vw 0" },
        },
      ]}
    >
      <Box>
        <Typography sx={[sectionHeader]}>
          Learning How To Invest Is Hard Enough
        </Typography>

        <Typography
          sx={[
            sectionSubHeader,
            {
              fontSize: {
                xl: "2rem",
              },
            },
          ]}
        >
          ✨Financify Simplifies This✨
        </Typography>

        <Box
          component="img"
          sx={imageBox}
          src={manIcon}
          alt="Guy sitting"
        ></Box>

        <Box sx={[grouped, { flexDirection: { sm: "row" } }]}>
          {homePageButtons.map((button, key) => {
            return (
              <Box key={key} sx={column}>
                <Typography
                  sx={[
                    btnHeader,
                    {
                      fontSize: {
                        xl: "1.3rem",
                      },
                    },
                  ]}
                >
                  {button.buttonName}
                </Typography>

                <Button variant="contained" sx={btn}>
                  Let's Go
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        component="img"
        sx={[imageBox, { display: { xs: "none", md: "flex" } }]}
        src={manIcon}
        alt="Guy sitting icon"
      ></Box>
    </Box>
  );
};
