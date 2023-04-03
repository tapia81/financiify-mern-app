import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { RecentTransactions } from "./RecentTransactions";

export const OverviewPanel = ({
  boxColumn,
  boxRow,
  card,
  cardHeader,
  accountValue,
  buyingPower,
}) => {
  return (
    <Box sx={boxColumn}>
      <Card
        sx={[
          card,
          {
            width: "80vw",
          },
        ]}
      >
        <Typography
          sx={[
            cardHeader,
            {
              fontSize: {
                xl: "2rem",
              },
            },
          ]}
        >
          Account Value
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xl: "1.5rem",
            },
          }}
        >
          {accountValue}
        </Typography>
        <Typography
          sx={[
            cardHeader,
            {
              fontSize: {
                xl: "2rem",
              },
            },
          ]}
        >
          Buying Power
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xl: "1.5rem",
            },
          }}
        >
          {buyingPower}
        </Typography>
      </Card>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          padding: { xs: "5vw 0 0 0", md: "0vw 0 0 0" },
        }}
      >
        <Typography sx={cardHeader}>Recent Transactions</Typography>
        <RecentTransactions />
      </Card>
    </Box>
  );
};
