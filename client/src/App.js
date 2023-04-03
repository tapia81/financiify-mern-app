import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Dashboard } from "./screens/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material";

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
      fontFamily: [
        "poppins",
        "Roboto",
        "sans-serif",
        '"Helvetica Neue"',
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Arial",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
