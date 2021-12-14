import React from "react";
import { Box } from "@mui/system";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("isLogin");
    navigate("/login");

    toast.success("Logout successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    });
  };

  const setLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              TO-DO list
            </Typography>

            {localStorage.getItem("isLogin") ? (
              <Button color="error" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="error" onClick={setLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
