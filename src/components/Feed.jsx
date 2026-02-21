import axios from "axios";
import { URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeedUser } from "../utils/feedSlice";
import TinderCard from "react-tinder-card";
import toast from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [users, setUsers] = useState([]);

  const getFeed = async () => {
    if (feed?.length > 0) {
      setUsers(feed);
      return;
    }

    try {
      const res = await axios.get(URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSwipe = async (dir, userId) => {
    const status = dir === "right" ? "interested" : "ignored";

    try {
      const res = await axios.post(
        URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (status === "interested") {
        toast.success(res.data.message || "Interest Sent ✨");
      } else {
        toast("Profile Skipped");
      }

    } catch (err) {
      toast.error("Already interacted or error");
    }

    setUsers(prev => prev.filter(u => u._id !== userId));
    dispatch(removeFeedUser(userId));
  };

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-black">
        <p className="text-xl opacity-70 font-semibold">
          No more developers 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex justify-center items-center 
      bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-10">

      <div className="relative w-80 h-[520px]">
        <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-3xl -z-10" />

        {users.map((user) => (
          <TinderCard
            key={user._id}
            onSwipe={(dir) => handleSwipe(dir, user._id)}
            preventSwipe={["up", "down"]}
            className="absolute"
          >
            <div className="w-80 h-[520px] rounded-3xl shadow-2xl overflow-hidden relative bg-black transition hover:scale-[1.02]">

              <img
                src={`https://i.pravatar.cc/500?u=${user._id}`}
                alt="profile"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full h-60 
                bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white w-[85%]">
                <h2 className="flex items-center gap-2 font-semibold">
                  {user.firstName} {user.lastName}, {user.age}

                  {user.isPremium && (
                    <span className="text-blue-400 text-xs font-medium">
                      ✔
                    </span>
                  )}
              </h2>

                <p className="text-sm opacity-80">{user.city}</p>
                <p className="text-sm mt-1 opacity-80">{user.about}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {user.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-emerald-400 font-semibold text-sm">
                  Match {user.matchScore}%
                </div>
              </div>

            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default Feed;
