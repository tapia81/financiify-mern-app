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
        alignItems: "center",
        minHeight: "100vh",
        maxWidth: "100vw",
        contain: "paint",
      }}
    >
      <Navigation />
      <Box sx={{ flexGrow: 2 }}>{props.children}</Box>
      <Footer />
    </Box>
  );
};
