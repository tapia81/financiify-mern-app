import { Box, Container, Button, Typography } from "@mui/material";
import githubLogo from "../../assets/logos/anthony_logo.jpg";
import linkedinLogo from "../../assets/logos/linkedin.png";

export const Footer = () => {
  const externalLinks = [
    {
      linkName: "Anthony",
      linkURL: "https://github.com/tapia81",
      linkImage: githubLogo,
      altText: "Github Logo",
    },
    {
      linkName: "Anthony",
      linkURL: "https://www.linkedin.com/in/anthonytapia81/",
      linkImage: linkedinLogo,
      altText: "Linkedin Logo",
    },
    {
      linkName: "George",
      linkURL: "https://github.com/George-Sucuzhanay",
      linkImage: githubLogo,
      altText: "Github Logo",
    },
    {
      linkName: "George",
      linkURL: "https://www.linkedin.com/in/georgesucuzhanay/",
      linkImage: linkedinLogo,
      altText: "Linkedin Logo",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: { xs: "wrap", xl: "nowrap" },
        justifyContent: { xs: "center", sm: "space-evenly" },
        alignItems: "center",
        minHeight: { xs: "15vw", lg: "3vw" },
        width: { xs: "100vw", xl: "25vw" },
        border: "solid purple",
      }}
    >
      {externalLinks.map((link, key) => {
        return (
          <Box
            key={key}
            sx={{
              display: { xs: "flex", lg: "flex" },
              flexDirection: "column",
              justifyContent: { xs: "center", lg: "space-between" },
              alignItems: "center",
              maxHeight: { xs: 233, sm: 250 },
              height: { xs: 150, sm: 250 },
              maxWidth: { xs: "40vw", sm: "20vw", xl: "7vw" },
              width: "40vw",
              textAlign: "center",
            }}
          >
            <a href={link.linkURL}>
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 233, md: 767 },
                  maxWidth: { xs: "50vw", md: 767 },
                  width: {
                    xs: "20vw",
                    sm: "10vw",
                    md: "7vw",
                    lg: "5vw",
                    xl: "3vw",
                  },
                }}
                src={link.linkImage}
                alt={link.altText}
              ></Box>
              <Typography
                sx={{
                  textAlign: { xs: "center", lg: "left" },
                  margin: { xs: "2vw 4vw", xl: "1vw 4vw" },
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "1.2rem",
                    lg: "2rem",
                    xl: "1.5rem",
                  },
                }}
              >
                {link.linkName}
              </Typography>
            </a>
          </Box>
        );
      })}
    </Box>
  );
};
