import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const [authChecked, setAuthChecked] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        URL + "/profile/view",
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

    } catch (err) {
      if (
        err.response?.status === 401 &&
        location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Body;