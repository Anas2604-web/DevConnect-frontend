const ProfilePreviewCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-80 h-[520px] rounded-3xl shadow-2xl overflow-hidden relative bg-black">

      <img
        src={user.photoUrl || `https://i.pravatar.cc/1100?u=${user.firstName}`}
        alt="profile"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full h-60 
        bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

      <div className="absolute bottom-5 left-5 text-white w-[85%]">
        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm opacity-80">{user.city}</p>
        <p className="text-sm mt-1 opacity-80">{user.about}</p>
      </div>

    </div>
  );
};

export default ProfilePreviewCard;
