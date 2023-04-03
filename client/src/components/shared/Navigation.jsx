import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Drawer, Stack, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Navigation = () => {
  const [open, setState] = useState(false);
  const pages = [
    { pageName: "Home", pagePath: "/" },
    { pageName: "Dashboard", pagePath: "/dashboard" },
    // { pageName: "Other", pagePath: "#" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <AppBar position="static" display="block">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "flex-start", md: "space-between" },
          alignItems: "center",
          height: { xs: "15vw", sm: "10vw", sm: "5vw", xl: "1vw" },
          margin: 0,
          padding: 0,
          backgroundColor: "white",
        }}
      >
        <IconButton
          edge="start"
          color="black"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{
            position: "absolute",
            display: { xs: "flex", md: "none" },
            marginLeft: { xs: "2vw" },
            zIndex: 2,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          sx={{
            position: { xs: "absolute", sm: "static" },
            textAlign: "center",
            width: { xs: "100vw", md: "auto" },
            zIndex: { xs: 1 },
            color: "black",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Financiify
        </Typography>

        <Drawer
          anchor="left"
          variant="temporary"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{
              p: 2,
              height: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavLink to="/">
              <Typography sx={{ color: "black", fontWeight: 600 }}>
                Home
              </Typography>
            </NavLink>
            <NavLink to="/dashboard">
              <Typography sx={{ color: "black", fontWeight: 600 }}>
                Dashboard
              </Typography>
            </NavLink>
          </Box>
        </Drawer>

        <Stack
          spacing={3}
          direction="row"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page, key) => {
            return (
              <NavLink to={page.pagePath} key={key}>
                <Typography
                  variant="h6"
                  sx={{ color: "black", fontWeight: 600 }}
                >
                  {page.pageName}
                </Typography>
              </NavLink>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
