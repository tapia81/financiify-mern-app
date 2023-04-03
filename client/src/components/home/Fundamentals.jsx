import React from "react";

export const Fundamentals = ({
  Box,
  Typography,
  Button,
  financialFundamentalTopics,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
    <Box sx={[sectionBox]}>
      <Typography
        sx={[
          sectionHeader,
          {
            padding: {
              xs: "10vw 3vw 3vw 3vw",
              sm: "5vw 15vw 3vw 15vw",
            },
            width: { xs: "100vw", sm: "100vw", md: "100vw" },
          },
        ]}
      >
        Learning the Fundamentals of Stock Trading
      </Typography>
      <Box
        sx={[
          grouped,
          {
            gap: { xs: 3, md: 5 },
          },
        ]}
      >
        {financialFundamentalTopics.map((topic, key) => {
          return (
            <Card
              key={key}
              sx={{
                maxWidth: { xs: "86vw", sm: "50vw", md: "35vw", lg: "30vw" },
                margin: { md: "0vw 1vw" },
              }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={topic.topicImage}
                title={topic.topicName}
                alt={topic.imageAlt}
              />
              <CardContent>
                <Box
                  component="img"
                  sx={{
                    maxHeight: { xs: 250, sm: "50vw" },
                    maxWidth: { xs: "10vw", sm: "4vw" },
                  }}
                  src={topic.icon}
                  alt={topic.iconAlt}
                ></Box>
                <Typography
                  gutterBottom
                  component="div"
                  sx={[
                    sectionSubHeader,
                    {
                      textAlign: "start",
                      fontSize: {
                        xl: "2rem",
                      },
                    },
                  ]}
                >
                  {topic.topicName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={[
                    sectionSubHeader,
                    {
                      textAlign: "start",
                      fontSize: {
                        sm: "1.2rem",
                        xl: "1.3rem",
                      },
                    },
                  ]}
                >
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{
                    fontSize: {
                      xl: "1.3rem",
                    },
                  }}
                >
                  Share
                </Button>
                <Button
                  size="small"
                  sx={{
                    fontSize: {
                      xl: "1.3rem",
                    },
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
