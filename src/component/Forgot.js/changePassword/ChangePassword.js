import React from "react";
import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { url } from "../../../constants";

const ChangePassword = (props) => {
  const [details, setDetails] = useState({ password: "", confirmPassword: "" });
  const changeHandler = (e) => {
    e.preventDefault();
    axios.post(`${url}changePassword`, details).then((res) => {
      console.log(res);
    });

    // if (e.target.value !== details.password) {   alert("error");   setDetails({
    // confirmPassword: e.target.value }); }

    if (details.password !== details.confirmPassword) {
      alert("The passwords doesn't match");
      return false; // The form won't submit
    } else return true; // The form will submit
  };

  if (details.res) {
    props.history.push("/login");
    // return <Redirect to={"/login"} />;
  }
  return (
    <>
      <div className="loginDiv">
        <div>
          <form onSubmit={changeHandler}>
            <div className="register">
              <span className="ForgotPassword">Reset Password</span>
              <span className="span">New Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setDetails({
                    ...details,
                    password: e.target.value,
                  })
                }
                value={details.password}
              />
              <span className="span">Repete Password</span>
              <input
                type="password"
                name="confirm_password"
                placeholder="confirm_password"
                onChange={(e) =>
                  setDetails({
                    ...details,
                    confirmPassword: e.target.value,
                  })
                }
                value={details.confirmPassword}
              />
              <div className="regP">
                <p>
                  <button onClick={changeHandler}>change</button>
                  <br />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default ChangePassword;
