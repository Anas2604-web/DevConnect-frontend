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
      await axios.post(URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="sticky top-0 z-50 
  backdrop-blur-xl 
  bg-gradient-to-r from-black/60 via-black/40 to-black/60
  border-b border-white/10
  shadow-[0_4px_30px_rgba(99,102,241,0.2)]
  text-white px-6 py-3 flex justify-between items-center">

      <Link to="/" className="text-xl font-bold tracking-wide hover:opacity-90">
        👨🏻‍💻 DevConnect
      </Link>

      <div className="flex items-center gap-4">
        {!user && (
          <Link
            to="/login"
            className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm"
          >
            Login
          </Link>
        )}

        {user && (
          <>
         <div className="flex items-center gap-2">
            <span>Welcome {user?.firstName}</span>

            {user?.isPremium && (
              <span className="bg-blue-500/20 text-blue-400 text-xs 
                px-2 py-0.5 rounded-full border border-blue-500/40">
                ✔Verified
              </span>
            )}
         </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-9 h-9 rounded-full ring-2 ring-indigo-500/70 hover:ring-indigo-400 transition overflow-hidden"
              >
                <img
                  alt="user"
                  src={user.photoUrl || "https://i.pravatar.cc/100"}
                  className="w-full h-full object-cover"
                />
              </div>

              <ul className="menu menu-sm dropdown-content mt-3 w-44 p-2 
                bg-gray-900 text-white rounded-xl shadow-xl border border-white/10">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/premium">Premium</Link></li>
                <li><button onClick={handleLogout} className="text-red-400">Logout</button></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
