import "./Register.css";
import { useSelector, useDispatch } from "react-redux";
import { setRegistInfo } from "../store/actions/user";
import { url } from "../../constants";
import axios from "axios";
import { useState } from "react";
const Register = () => {
  const registInfo = useSelector((state) => state.user.registInfo);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      setRegistInfo({
        ...registInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleRegister = async () => {
    setIsLoading(curr => !curr)

    try {
      const savedUser = await axios.post(`${url}register`, registInfo)

      localStorage.setItem("user", JSON.stringify(savedUser))
    } catch (error) {
      console.log("REGISTER ERROR: ", error)
    } finally {
      setIsLoading(curr => !curr)
    }
  }

  // const getRegist = () => {
  //   axios
  //     .get(`${url}regist`)
  //     .then((r) => setUserInfo(r.data))
  //     .catch((error) => console.error(`Error: ${error}`));
  // };
  return (
    <div className="loginDiv" activeClassName="active">
      <div>
        <div className="register">
          {/* <div className="profIcon">
            <img src="./../icon/7.png" />
          </div> */}
          <span className="pRegist">Register</span>

          <span className="span">Name</span>
          <input
            onChange={handleChange}
            value={registInfo.name}
            name="name"
            placeholder="Enter Full Name"
          />
          <span className="span">Email Address</span>
          <input
            onChange={handleChange}
            value={registInfo.email}
            name="email"
            placeholder="Enter Email"
          />
          <span className="span">Password</span>
          <input
            type="password"
            onChange={handleChange}
            value={registInfo.password}
            name="password"
            placeholder="Enter Password"
          />
          <span className="span">Confirm Password</span>
          <input
            type="password"
            onChange={handleChange}
            value={registInfo.c_password}
            name="c_password"
            placeholder=" Confirm Password"
          />

          <button onClick={handleRegister} disabled={isLoading}>{isLoading ? "Loding..." : "Register"}</button>
        </div>
      </div>
    </div>
  );
};
export default Register;
