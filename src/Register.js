import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setLogin = () => {
    navigate("/login");
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        return toast.error("All fields are mandatory!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      }

      const userRegister = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (userRegister) {
        toast.success("Register successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });

        navigate("/login");
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
        <h1>Register Form</h1>

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
            color="success"
            type="submit"
            style={{ width: "150px", padding: "5px" }}
            onClick={submitRegister}
          >
            Register Now
          </Button>

          <Button
            variant="outlined"
            color="error"
            style={{ width: "150px", padding: "5px" }}
            onClick={setLogin}
          >
            Login Now
          </Button>
        </div>
      </Container>
    </form>
  );
};

export default Register;
