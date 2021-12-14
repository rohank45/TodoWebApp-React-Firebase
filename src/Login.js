import { Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setRegister = () => {
    navigate("/register");
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        return toast.error("All fields are mandatory!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      }

      const userRegister = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (userRegister) {
        toast.success("Login successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });

        localStorage.setItem("isLogin", "true");

        navigate("/");
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
    }
  };

  return (
    <form>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "50px",
          backgroundColor: "#F5F5F5",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Login Form</h1>

        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          style={{ width: "300px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="standard-password-input"
          label="password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          style={{ width: "300px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            type="submit"
            sstyle={{
              width: "100px",
              padding: "5px",
            }}
            onClick={setRegister}
          >
            Register Now
          </Button>

          <Button
            variant="outlined"
            color="success"
            onClick={submitLogin}
            style={{
              width: "100px",
              padding: "5px",
            }}
          >
            LOGIN
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default Login;
