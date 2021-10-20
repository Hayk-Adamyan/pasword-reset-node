import "./header.css";
import { NavLink } from "react-router-dom";
const Header = ({ user, history, setUser }) => {
  const LogOut = () => {
    localStorage.removeItem("log");
    history.push("/login");
    setUser(null);
  };
  return (
    <>
      <div className="header">
        <div>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </div>
        {localStorage.getItem("log") && (
          <div>
            <button
              type="button"
              className="btn-secondary logout"
              onClick={LogOut}
            >
              LogOut
            </button>
          </div>
        )}

        {!user && (
          <div className="login">
            <div className="log">
              <NavLink to="/login"> Login</NavLink>
            </div>
            <div>
              <NavLink to="/regist">Register</NavLink>
            </div>

            <NavLink to="/todo"></NavLink>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
