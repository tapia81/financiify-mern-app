import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Box } from "@mui/material";
export const Layout = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100vw",
        maxWidth: "100%",
        padding: 0,
        margin: 0,
        contain: "paint",
      }}
    >
      <Navigation />
      <Box>{props.children}</Box>
      {/* <Footer /> */}
    </Box>
  );
};
