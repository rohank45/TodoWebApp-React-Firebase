import React, { useEffect, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { auth, db } from "./firebase";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [user, setUser] = useState("");
  const [myTodos, setMyTodos] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((userVal) =>
      userVal ? setUser(userVal) : setUser(null)
    );
  }, []);

  //getData
  useEffect(() => {
    if (user) {
      db.collection("todos")
        .doc(user.uid)
        .onSnapshot((curElm) => {
          if (curElm.exists) {
            setMyTodos(curElm.data().todos);
          }
        });
    }
  }, []);

  //addData
  const AddTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        todos: [...myTodos, todo],
      });
  };

  //deleteSpecificData
  const DeleteTodo = (id) => {
    db.collection("todos")
      .doc(user.uid)
      .get()
      .then((valData) => {
        const res = valData.data().todos.filter((index) => index !== id);

        db.collection("todos").doc(user.uid).update({
          todos: res,
        });
      });
  };

  //deleteAllData
  const EmptyTodo = () => {
    db.collection("todos").doc(user.uid).update({
      todos: [],
    });
  };

  return (
    <>
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
        <TextField
          id="standard-basic"
          label="enter task"
          variant="standard"
          autoComplete="off"
          onChange={(e) => setTodo(e.target.value)}
          style={{ width: "300px" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={AddTodo}
            style={{ padding: "10px", width: "100px" }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={EmptyTodo}
            style={{ padding: "10px", width: "100px" }}
          >
            Empty
          </Button>
        </div>

        <ul>
          {myTodos.map((val) => (
            <li
              key={val}
              style={{
                marginTop: "20px",
                backgroundColor: "grey",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              {val}

              <DeleteOutlineIcon
                style={{
                  color: "white",
                  float: "right",
                }}
                onClick={() => DeleteTodo(val)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Home;
