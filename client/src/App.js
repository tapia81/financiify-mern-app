import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Dashboard } from "./screens/Dashboard";
import { createTheme, ThemeProvider, keyframes } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#003780",
        light: "#2D95EC",
        dark: "#002659",
      },
      secondary: {
        main: "#804900",
        light: "#996D33",
        dark: "#593300",
      },
      background: {
        default: "#335F99",
      },
    },
    typography: {
      h1: {
        fontFamily: "Roboto",
      },
      h2: {
        fontFamily: "Roboto Slab",
        fontSize: 16, // Default font size

        // (mobile devices)
        "@media (min-width: 321px) and (max-width: 600px)": {
          fontSize: "2.1rem",
        },

        // (tablets and smaller laptops)
        "@media (min-width: 601px) and (max-width: 960px)": {
          fontSize: "2.7rem",
        },

        // (larger laptops and desktops)
        "@media (min-width: 961px) and (max-width: 1280px)": {
          fontSize: "2.5rem",
        },

        // (larger desktops)
        "@media (min-width: 1281px)": {
          fontSize: "2.9rem",
        },
      },
      h3: {
        fontFamily: "Roboto Slab",
        fontSize: 16, // Default font size

        // (mobile devices)
        "@media (min-width: 321px) and (max-width: 600px)": {
          fontSize: "1.6rem",
        },

        // (tablets and smaller laptops)
        "@media (min-width: 601px) and (max-width: 960px)": {
          fontSize: "2.5rem",
        },

        // (larger laptops and desktops)
        "@media (min-width: 961px) and (max-width: 1280px)": {
          fontSize: "1.6rem",
        },

        // (larger desktops)
        "@media (min-width: 1281px)": {
          fontSize: "2.1rem",
        },
      },
      h4: {
        fontFamily: "Roboto",
        fontSize: 16, // Default font size

        // (mobile devices)
        "@media (min-width: 321px) and (max-width: 600px)": {
          fontSize: "0.9rem",
        },

        // (tablets and smaller laptops)
        "@media (min-width: 601px) and (max-width: 960px)": {
          fontSize: "1.4rem",
        },

        // (larger laptops and desktops)
        "@media (min-width: 961px) and (max-width: 1280px)": {
          fontSize: "1rem",
        },

        // (larger desktops)
        "@media (min-width: 1281px)": {
          fontSize: "1.2rem",
        },
      },
      h5: {
        fontFamily: "Roboto Slab",
        fontSize: 16, // Default font size

        // (mobile devices)
        "@media (min-width: 321px) and (max-width: 600px)": {
          fontSize: "1.3rem",
        },

        // (tablets and smaller laptops)
        "@media (min-width: 601px) and (max-width: 960px)": {
          fontSize: "2rem",
        },

        // (larger laptops and desktops)
        "@media (min-width: 961px) and (max-width: 1200px)": {
          fontSize: "1.7rem",
        },

        // (larger desktops)
        "@media (min-width: 1201px)": {
          fontSize: "1.8rem",
        },
      },
      h6: {
        fontFamily: "Roboto",
        fontSize: 16, // Default font size

        // (mobile devices)
        "@media (min-width: 321px) and (max-width: 600px)": {
          fontSize: "0.9rem",
        },

        // (tablets)
        "@media (min-width: 601px) and (max-width: 960px)": {
          fontSize: "1.5rem",
        },

        // (smaller laptops)
        "@media (min-width: 961px) and (max-width: 1200px)": {
          fontSize: "1.2rem",
        },

        // (larger laptops and desktops)
        "@media (min-width: 1201px) and (max-width: 1500px)": {
          fontSize: "1rem",
        },

        // (larger desktops)
        "@media (min-width: 1501px)": {
          fontSize: "1.2rem",
        },
      },
      // fontFamily: [
      //   "Roboto",
      //   "Josefin Sans",
      //   "Signika Negative",
      //   "poppins",
      //   "sans-serif",
      //   '"Helvetica Neue"',
      //   "BlinkMacSystemFont",
      //   '"Segoe UI"',
      //   "Arial",
      //   '"Apple Color Emoji"',
      //   '"Segoe UI Emoji"',
      //   '"Segoe UI Symbol"',
      // ].join(","),
    },
  });

  //..........................Start of CSS Objects............................//
  const screenContainerStyles = {
    minHeight: { xs: "93vh" },
    width: "100%",
  };
  //..........................End of CSS Objects..............................//

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                screenContainerStyles={screenContainerStyles}
                keyframes={keyframes}
              />
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <Dashboard screenContainerStyles={screenContainerStyles} />
            }
          ></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
