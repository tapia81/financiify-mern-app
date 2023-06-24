import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Card } from "@mui/material";

export const NewsPanel = ({
  defaultFlexStyles,
  loaderBox,
  componentContainerStyles,
  cardContainerStyles,
  cardHeader,
  cardSubHeader,
}) => {
  const [news, setNews] = useState([]);

  const fetchNewsArticles = async () => {
    try {
      await axios
        .get(
          `https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINN_HUB}`
        )
        .then((marketNews) => {
          setNews(marketNews.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  return (
    <Box sx={defaultFlexStyles}>
      {!news || news.length < 1 ? (
        <Box sx={loaderBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={[
            componentContainerStyles,
            {
              flexWrap: { xs: "nowrap", md: "wrap", lg: "nowrap" },
              height: { xs: "auto" },
              "@media (orientation: landscape)": {
                display: { sm: "grid" },
                gridTemplateColumns: {
                  sm: "repeat(auto-fill, 45%)",
                  xl: "repeat(auto-fill, 30%)",
                },
              },
            },
          ]}
        >
          {news.slice(0, 10).map((market, key) => {
            return (
              <Card
                key={key}
                sx={[
                  cardContainerStyles,
                  {
                    justifyContent: { xs: "space-evenly" },
                    gap: { xs: 0 },
                    minHeight: { xs: "60vh", sm: "70vh", lg: "80vh" },
                    height: { xs: "50vh", sm: "85vh", lg: "80vh" },
                    padding: {
                      xs: "5vw 0vw",
                      lg: "2vw 0vw",
                      xl: "0vw 0vw",
                    },
                    "@media (orientation: landscape)": {
                      width: { xs: "40%", sm: "100%" },
                    },
                  },
                  ,
                ]}
              >
                <Typography
                  variant="h5"
                  sx={[
                    cardHeader,
                    {
                      padding: {
                        xs: "0 5vw",
                        sm: "0 3vw",
                        md: "0vw 3vw",
                        lg: "0vw 0vw",
                      },
                      margin: {
                        lg: "0 1vw",
                      },
                      fontWeight: "bold",
                      "@media (orientation: landscape)": {
                        minHeight: {
                          xs: "15%",
                          md: "20%",
                          lg: "20%",
                        },
                        height: {
                          xs: "15%",
                          md: "20%",
                          lg: "20%",
                        },
                        textOverflow: "ellipsis",
                      },
                    },
                  ]}
                >
                  {market.headline}
                </Typography>

                <Box
                  component="img"
                  sx={{
                    display: { xs: "flex" },
                    flexDirection: "column",
                    margin: { xs: "2vw 0", md: "0vw 0" },
                    height: { xs: "auto", sm: "50%", md: "45%", lg: "40%" },
                    minHeight: { xs: "25vh", sm: "50%", md: "45%", lg: "40%" },
                    width: { xs: "90%", lg: "85%" },
                    objectFit: {
                      xs: "scale-down",
                      sm: "fill",
                      md: "scale-down",
                      lg: "cover",
                      xl: "fill",
                    },
                    margin: {
                      lg: "0 1vw",
                    },
                  }}
                  src={market.image}
                  alt="Guy sitting icon"
                ></Box>

                <Typography
                  variant="h6"
                  sx={[
                    cardSubHeader,
                    {
                      padding: {
                        xs: "0 5vw",
                        sm: "0 3vw",
                        md: "0 3vw",
                        lg: "0 1vw",
                      },
                    },
                    {
                      "@media (orientation: landscape)": {
                        minHeight: {
                          xs: "15%",
                          md: "20%",
                          lg: "20%",
                        },
                        height: {
                          xs: "15%",
                          md: "20%",
                          lg: "20%",
                        },
                        margin: {
                          lg: "0 1vw",
                        },
                      },
                    },
                  ]}
                >
                  {market.summary}
                </Typography>

                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: { xs: "0vw 0", md: "0vw 0" },
                    padding: { xs: "0 0vw", sm: "0 0vw", md: "0 0vw" },
                    fontSize: { xs: "1rem", sm: "2rem", md: "1.5rem" },
                    margin: {
                      lg: "0 1vw",
                    },
                    "@media (orientation: landscape)": {
                      minHeight: {
                        xs: "15%",
                        md: "auto",
                        lg: "10%",
                      },
                      height: {
                        xs: "15%",
                        md: "auto",
                        lg: "10%",
                      },
                    },
                  }}
                >
                  <a
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow "
                  >
                    Learn More
                  </a>
                </Typography>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
