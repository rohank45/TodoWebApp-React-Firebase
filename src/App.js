import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route index path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
