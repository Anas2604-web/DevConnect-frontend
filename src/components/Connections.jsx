import axios from "axios";
import { URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-black">
        <p className="text-xl opacity-70 font-semibold">
          No Connections Yet 🤝
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-10 px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-5 text-white hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl || `https://i.pravatar.cc/150?u=${user._id}`}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border border-white/20"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm opacity-70">{user.city}</p>
              </div>
            </div>

            <p className="mt-3 text-sm opacity-80 line-clamp-2">
              {user.about}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {user.skills?.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
