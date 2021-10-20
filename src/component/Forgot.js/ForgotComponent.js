import React from "react";
import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { url } from "../../constants";
function ForgotComponent(props) {
  const [details, setDetails] = useState({ email: "test@gmail.com" });
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${url}forgot`, details)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Pass = () => {
    props.history.push("/changePassword");
  };

  return (
    <>
      <div className="loginDiv">
        <div>
          <form onSubmit={submitHandler}>
            <div className="register">
              <span className="ForgotPassword">Forgot Password</span>
              <span className="span">Email </span>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) =>
                  setDetails({
                    ...details,
                    email: e.target.value,
                  })
                }
                value={details.email}
              />

              <div className="regP">
                <p>
                  <button>submit</button>
                  <br />
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotComponent;
