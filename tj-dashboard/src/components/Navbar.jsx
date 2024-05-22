import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { SideBar } from "./SideBar.jsx";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [user, setUser] = useState(null)
  React.useEffect(() => {
    const auth = getAuth();
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubcribe();
  }, [])

  const handleLogout = async() => {
    const auth = getAuth();
    await signOut(auth)
    alert('Log out successfully')
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Thomas Jefferson Elementary
          </Typography>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <SideBar
        open={open}
        setOpen={setOpen}
        toggleDrawer={toggleDrawer}
      ></SideBar>
    </Box>
  );
};
