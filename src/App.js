import "./App.css";
import Header from "./component/header/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/regist/Register";
import Todo from "./component/mine/Todo/Todo";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Home from "./component/home/Home";
import { useHistory } from "react-router-dom";
import ForgotComponent from "./component/Forgot.js/ForgotComponent";
import ChangePassword from "./component/Forgot.js/changePassword/ChangePassword";

function App() {
  const [notes, getNotes] = useState("");

  const [user, setUser] = useState(localStorage.getItem("log"));

  const url = "http://localhost:3002/";

  const getAllNotes = useCallback(() => {
    axios
      .get(`${url}user`)
      .then((r) => {
        const allNotes = r.data;
        getNotes(allNotes);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);
  // console.log(notes);

  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);

  let history = useHistory();

  return (
    <>
      <Header user={user} history={history} setUser={setUser} />
      <div className="mine">
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home user={user} history={history} />}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <Login notes={notes} history={history} setUser={setUser} />
            )}
          />
          <Route path="/regist" exact render={() => <Register />} />
          <Route
            path="/todo"
            exact
            render={() => (
              <Todo history={history} user={user} setUser={setUser} />
            )}
          />
          <Route
            path="/forgot"
            exact
            render={() => <ForgotComponent history={history} />}
          />
          <Route
            path="/changePassword"
            exact
            render={() => <ChangePassword history={history} />}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
}
export default App;
