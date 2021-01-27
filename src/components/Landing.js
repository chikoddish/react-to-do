import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";

const Landing = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const user = useContext(UserContext);
  const userId = user._id;

  useEffect(() => {
    (async () => {
      const apiUrl = "http://localhost:5000/todo/get";
      const data = await axios.post(apiUrl, { userId });
      setTodos(data.data);
    })();
  }, [todo, userId]);

  const addToDo = () => {
    if (todo === "") {
      setError("Please enter valid todo");
    } else {
      axios
        .post("http://localhost:5000/todo/add", { todo, userId })
        .then((response) => {
          setError("");
          setTodo("");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const remove = (id) => {
    axios.post("http://localhost:5000/todo/remove", { id });
  };
  return (
    <div className="main">
      <p className="sign" align="center">
        To do
      </p>
      {error}
      <input
        type="text"
        className="un"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button className="submit" onClick={() => addToDo()}>
        Add
      </button>
      <div className="card-section">
        <ul>
          {todos
            ? todos.map((item) => (
                <li>
                  <input id="item1" type="checkbox" />
                  <label for="item1"></label>
                  {item.todo}
                  <span className="delete" onClick={() => remove(item._id)}>
                    delete
                  </span>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
