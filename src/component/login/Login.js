import "./login.css";
import { useState } from "react";
import { url } from "./../../constants";
import axios from "axios";

// import Todo from "../mine/Todo/Todo";

const Login = (props) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const login = () => {
    const savedUserLogin = axios
      .post(`${url}login`, details)
      .then((r) => {
        localStorage.setItem("log", JSON.stringify(r.data.name));
        props.history.push("/todo");
        props.setUser(localStorage.getItem("log"));

        return setDetails(r.data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };
  const Forgot = () => {
    props.history.push("/forgot");
  };

  return (
    <>
      <div className="loginDiv" activeClassName="active">
        <div>
          <form onSubmit={submitHandler}>
            <div className="register">
              <span className="pRegist">Login</span>
              <span className="span">Email Address</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
              <span className="span">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />

              <button onClick={login}>LOGIN</button>
            </div>
          </form>
          <div className="regP">
            <p>
              <button className="forgotButton" onClick={Forgot}>
                <a>* forgot password</a>
              </button>
              <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
// const Login = (props) => {
//   // const Change = (e) => {
//   //   alert(state);
//   //   setState("");
//   // };

//   const displayNotes = () => {
//     const { notes } = props;

//     if (notes.length > 0) {
//       return (
//         <div>
//           <div className="employees">
//             <div>
//               <h1>employees</h1>
//             </div>
//           </div>
//           <div className="container">
//             <table className="table table-dark table-bordered">
//               <thead>
//                 <tr>
//                   <th>name</th>
//                   <th>surname</th>
//                   <th>age</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {notes.map((note, i) => {
//                   return (
//                     <tr key={i}>
//                       <td>{note.firstName}</td>

//                       <td>{note.age}</td>
//                       <td>
//                         <button className="btn btn-danger">delete</button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     } else {
//       return <h1>no</h1>;
//     }
//   };
//   return <div>{displayNotes(props)}</div>;
// };
