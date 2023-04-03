import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

export const NewsPanel = ({
  boxColumn,
  boxRow,
  card,
  cardHeader,
  Link,
  setInputValue,
  bestMatches,
  setBestMatches,
  initialStocks,
  submitOnEnter,
}) => {
  const [news, setNews] = useState([]);

  const fetchProfile = async () => {
    try {
      const marketNews = await axios
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
    fetchProfile();
  }, []);

  return (
    <Box
      sx={[
        boxColumn,
        {
          flexDirection: { md: "row" },
          flexWrap: "wrap",
          maxWidth: { md: "100vw" },
          width: { md: "100vw" },
          padding: { xs: "5vw 0vw", md: "0vw 0vw" },
          gap: { md: 3, lg: 10 },
        },
      ]}
    >
      {news.slice(0, 10).map((market, key) => {
        console.log(market);
        return (
          <Card
            sx={[
              card,
              {
                justifyContent: { sm: "space-evenly" },
                gap: { md: 3 },
                height: { sm: "50vh", md: "60vh" },
                width: { md: "33vw", lg: "25vw" },
                padding: { xs: "5vw 0vw", md: "0vw 0vw" },
                border: "solid 0.1vw",
              },
            ]}
          >
            <Typography
              sx={{
                textAlign: { xs: "center", lg: "center" },
                padding: { xs: "0 5vw", sm: "0 3vw", md: "0vw 3vw" },
                fontWeight: "bold",
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1rem",
                },
              }}
            >
              {market.headline}
            </Typography>

            <Box
              component="img"
              sx={{
                display: { xs: "flex" },
                flexDirection: "column",
                margin: { xs: "2vw 0", md: "0vw 0" },
                padding: { xs: "0 15vw", sm: "0 25vw", md: "0 0vw" },
                maxHeight: { xs: 250, sm: "50vw", md: "20vw" },
                width: { xs: "100vw", sm: "100vw", md: "20vw" },
              }}
              src={market.image}
              alt="Guy sitting icon"
            ></Box>

            <Typography
              sx={{
                textAlign: "center",
                margin: { xs: "5vw 0", sm: "0vw 0vw", md: "0vw 0" },
                padding: { xs: "0 5vw", sm: "0 3vw", md: "0 3vw" },
                fontSize: { xs: "1rem", sm: "1.5rem", md: "1rem" },
              }}
            >
              {market.summary}
            </Typography>

            <a
              href={market.url}
              target="_blank"
              rel="noopener noreferrer nofollow "
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: { xs: "0vw 0", md: "0vw 0" },
                  padding: { xs: "0 0vw", sm: "0 0vw", md: "0 0vw" },
                  fontSize: { xs: "1rem", sm: "2rem", md: "1rem" },
                }}
              >
                Learn More
              </Typography>
            </a>
          </Card>
        );
      })}
    </Box>
  );
};
