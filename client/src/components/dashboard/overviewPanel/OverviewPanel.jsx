import React from "react";
import { Box, Typography, Card, CircularProgress } from "@mui/material";
import { RecentTransactions } from "./RecentTransactions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const OverviewPanel = ({
  accountValue,
  buyingPower,
  defaultFlexStyles,
  loaderBox,
  componentContainerStyles,
  cardContainerStyles,
  cardHeader,
  cardSubHeader,
}) => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 500 },
    { name: "May", value: 600 },
  ];

  return (
    <Box
      sx={[
        componentContainerStyles,
        {
          height: { sm: "90vh" },
          "@media (orientation: landscape)": {
            minHeight: {
              md: "75vh",
            },
            height: {
              md: "75vh",
            },
          },
        },
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "column",
            lg: "column",
          },
          justifyContent: { xs: "flex-start", sm: "space-between" },
          gap: { xs: 3, md: "2vw" },
          height: { xs: "65vh", sm: "60%", md: "100%", lg: "100%" },
          width: "100%",
        }}
      >
        <Card
          sx={[
            cardContainerStyles,
            {
              height: { xs: "50%", sm: "100%", md: "48%", xl: "48%" },
              width: { xs: "100%" },
              justifyContent: { xs: "center" },
            },
          ]}
        >
          {!accountValue && !buyingPower ? (
            <Box sx={loaderBox}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                flexDirection: { xs: "row", sm: "column", md: "row" },
                flexWrap: {
                  xs: "wrap",
                  sm: "nowrap",
                  md: "wrap",
                  lg: "nowrap",
                },
                gridTemplateColumns: {
                  xs: "repeat(auto-fill, 50%)",
                  sm: "repeat(auto-fill, 100%)",
                  md: "repeat(auto-fill, 50%)",
                },
                gap: { xs: "0px", sm: "50px", md: "0px" },
                textAlign: "center",
                width: "100%",
              }}
            >
              <Box sx={[defaultFlexStyles, { minHeight: { xs: "auto" } }]}>
                <Typography variant="h5">Account Value</Typography>
                <Typography variant="h6">${accountValue}</Typography>
              </Box>

              <Box sx={[defaultFlexStyles, { minHeight: { xs: "auto" } }]}>
                <Typography variant="h5">Buying Power</Typography>

                <Typography variant="h6">${buyingPower}</Typography>
              </Box>
            </Box>
          )}
        </Card>

        <Card
          sx={[
            cardContainerStyles,
            {
              height: {
                xs: "80%",
                sm: "100%",
                md: "48%",
                lg: "100%",
                xl: "100%",
              },
              justifyContent: { xs: "center" },
              alignItems: { xs: "start" },
            },
          ]}
        >
          {!data && data.length < 1 ? (
            <Box sx={loaderBox}>
              <CircularProgress />
            </Box>
          ) : (
            <ResponsiveContainer width="90%" height="90%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </Box>

      <Card
        sx={[
          cardContainerStyles,
          {
            maxHeight: { xs: "90%", sm: "100%", lg: "100%", lg: "100%" },
            height: { xs: "70vh", sm: "100%", lg: "100%" },
          },
        ]}
      >
        <Typography
          variant="h5"
          sx={[
            cardHeader,
            {
              height: { xs: "10%", sm: "10%", md: "10%", lg: "8%", xl: "7%" },
              padding: "10px 0",
              margin: 0,
            },
          ]}
        >
          Recent Transactions
        </Typography>
        <RecentTransactions
          componentContainerStyles={componentContainerStyles}
          cardHeader={cardHeader}
          cardSubHeader={cardSubHeader}
          loaderBox={loaderBox}
        />
      </Card>
    </Box>
  );
};
