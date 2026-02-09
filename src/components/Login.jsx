import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Invalid credentials");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex justify-center items-center 
      bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 px-4 py-10">

      <div className="card w-full max-w-md bg-white/5 backdrop-blur-md 
        border border-white/10 shadow-2xl rounded-2xl text-white">

        <div className="card-body">

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              {isLogin ? "Welcome back 👨🏻‍💻" : "Join DevConnect 🚀"}
            </h2>
            <p className="opacity-70 mt-1">
              {isLogin ? "Login to continue" : "Create your account"}
            </p>
          </div>
<form
  onSubmit={isLogin ? handleLogin : handleSignup}
  className="mt-8 space-y-5"
>

  {!isLogin && (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm opacity-80">First Name</label>
        <input
          type="text"
          className="input input-bordered w-full mt-1 rounded-xl bg-black/40 text-white"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm opacity-80">Last Name</label>
        <input
          type="text"
          className="input input-bordered w-full mt-1 rounded-xl bg-black/40 text-white"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </div>
  )}

  <div>
    <label className="text-sm opacity-80">Email</label>
    <input
      type="email"
      placeholder="you@example.com"
      className="input input-bordered w-full mt-1 rounded-xl bg-black/40 text-white"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label className="text-sm opacity-80">Password</label>
    <input
      type="password"
      placeholder="••••••••"
      className="input input-bordered w-full mt-1 rounded-xl bg-black/40 text-white"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  {error && (
    <p className="text-error text-sm font-medium">{error}</p>
  )}

  <button className="btn btn-primary w-full rounded-xl mt-4 h-12 text-lg">
    {isLogin ? "Login" : "Sign Up"}
  </button>

  <p className="text-center text-sm opacity-70 mt-4">
    {isLogin ? "Don’t have an account?" : "Already have an account?"}
    <button
      type="button"
      onClick={() => setIsLogin(!isLogin)}
      className="text-indigo-400 font-semibold ml-1"
    >
      {isLogin ? "Sign up" : "Login"}
    </button>
  </p>
</form>

        </div>
      </div>
    </div>
  );
};

export default Auth;
