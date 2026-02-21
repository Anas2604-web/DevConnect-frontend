import axios from "axios";
import { URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequestById } from "../utils/requestSlice";
import { addOneConnection } from "../utils/connectionSlice";
import toast from "react-hot-toast";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (status, req) => {
    try {
      await axios.post(
        URL + `/request/review/${status}/${req._id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequestById(req._id));

      if (status === "accepted") {
        dispatch(addOneConnection(req.fromUserId));
        toast.success("Connection Added 🤝");
      } else {
        toast("Request Rejected");
      }

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-black">
        <p className="text-xl opacity-70 font-semibold">
          No Pending Requests 📨
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-10 px-4">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-5 text-white transition hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.photoUrl ||
                    `https://i.pravatar.cc/150?u=${user._id}`
                  }
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover border border-white/20"
                />

                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-1">
                  {user.firstName} {user.lastName}

                  {user.isPremium && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/40">
                      ✔
                    </span>
                  )}
              </h2>
                  <p className="text-sm opacity-70">
                    {user.city} • {user.age}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm opacity-80 line-clamp-2">
                {user.about}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {user.skills?.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  className="btn btn-success btn-sm flex-1 rounded-xl"
                  onClick={() => handleReview("accepted", req)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-error btn-sm flex-1 rounded-xl"
                  onClick={() => handleReview("rejected", req)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
