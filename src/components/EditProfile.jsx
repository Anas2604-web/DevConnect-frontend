import { useState } from "react";
import axios from "axios";
import { URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ProfilePreviewCard from "./ProfilePreviewCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [city, setCity] = useState(user?.city || "");
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skillsInput, setSkillsInput] = useState(
    user?.skills?.join(", ") || ""
  );
  const [error, setError] = useState("");

  const skillsArray = skillsInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const previewUser = {
    firstName,
    lastName,
    photoUrl,
    city,
    about,
    age,
    gender,
    skills: skillsArray
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.patch(
        URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          city,
          about,
          age: age ? Number(age) : undefined,
          gender,
          skills: skillsArray
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      toast.success("Profile updated 🚀");
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Update failed");
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-12 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100/95 backdrop-blur-md shadow-2xl border border-white/10 rounded-2xl">
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Edit Profile ✨</h2>
            <p className="text-base-content/70 mt-1">
              Update your DevConnect details
            </p>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="form-control w-full">
              <span className="label-text">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-200"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-200"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Age</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-200"
                min={18}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Gender</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-base-200"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text">Photo URL</span>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-200"
                placeholder="https://i.pravatar.cc/300?img=4"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">City</span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input input-bordered w-full rounded-xl bg-base-200"
                placeholder="Mumbai"
              />
            </label>

           <div className="w-full">
  <p className="text-sm mb-1">Skills</p>

  <input
    type="text"
    value={skillsInput}
    onChange={(e) => setSkillsInput(e.target.value)}
    className="input input-bordered w-full rounded-xl bg-base-200"
    placeholder="React, Node, MongoDB"
  />

  <p className="text-xs opacity-60 mt-1">
    Separate with commas • max 10 skills
  </p>
</div>

<div className="w-full mt-4">
  <p className="text-sm mb-1">About</p>

  <textarea
    value={about}
    maxLength={120}
    onChange={(e) => setAbout(e.target.value)}
    className="textarea textarea-bordered w-full rounded-xl bg-base-200 h-24 resize-none"
    placeholder="Tell something cool about yourself..."
  />

  <p className="text-xs opacity-60 text-right mt-1">
    {about.length}/120
  </p>
</div>


            {error && (
              <p className="text-error text-sm font-medium">{error}</p>
            )}

            <button className="btn btn-primary w-full rounded-xl mt-3">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block">
        <ProfilePreviewCard user={previewUser} />
      </div>

      <div className="lg:hidden mt-8">
        <ProfilePreviewCard user={previewUser} />
      </div>
    </div>
  );
};

export default EditProfile;
