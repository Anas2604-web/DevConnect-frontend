import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="navbar bg-base-300 text-base-content shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨🏻‍💻 DevConnect
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {!user && (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}

        {user && (
          <>
            <p className="font-medium">Welcome {user.firstName}</p>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={user.photoUrl || "https://i.pravatar.cc/100"}
                  />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
