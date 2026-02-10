import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(user) return;
    try {
      const res = await axios.get(
        URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
        if (location.pathname === "/login") {
      navigate("/feed");
    }

    } catch (err) {
      if (
        err.response?.status === 401 &&
        location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

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
