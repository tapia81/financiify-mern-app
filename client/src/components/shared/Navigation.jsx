import * as React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Box, Drawer, Stack, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Navigation = () => {
  const location = useLocation();
  const [open, setState] = useState(false);
  const pages = [
    { pageName: "Home", pagePath: "/" },
    { pageName: "Dashboard", pagePath: "/dashboard" },
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

  const menuItems = {
    color: "black",
    fontWeight: 600,
    fontSize: { xs: "1.5rem", sm: "2.5rem", md: "1.5rem" },
    marginTop: { md: "10px" },
    textDecoration: "none",
  };
  return (
    <AppBar position="static" display="block">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: {
            xs: "center",
            md: "space-between",
            lg: "space-evenly",
          },
          alignItems: "center",
          gap: { lg: "65%" },
          height: { xs: "15vw", sm: "10vw", md: "5vw", xl: "1vw" },
          margin: 0,
          padding: 0,
          backgroundColor: location.pathname === "/" ? "#EDF2FB" : "white",
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
            left: 0,
            marginLeft: { xs: "2vw" },
            zIndex: 2,
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <NavLink to="/">
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              width: { xs: "auto", md: "auto" },
              zIndex: { xs: 1 },
              color: "black",
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2.5rem", md: "2rem" },
              marginTop: "10px",
            }}
          >
            Financiify
          </Typography>
        </NavLink>

        <Drawer
          anchor="left"
          variant="temporary"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          onClick={toggleDrawer(false)}
        >
          <Box
            sx={{
              p: 2,
              height: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <NavLink to="/">
              <Typography sx={menuItems} onClick={toggleDrawer(false)}>
                Home
              </Typography>
            </NavLink>

            <NavLink to="/dashboard">
              <Typography sx={menuItems} onClick={toggleDrawer(false)}>
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
              <NavLink
                to={page.pagePath}
                key={key}
                sx={{
                  textDecoration: "none",
                }}
              >
                <Typography variant="h1" sx={menuItems}>
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
