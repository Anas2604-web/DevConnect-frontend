const ProfilePreviewCard = ({ user }) => {
  if (!user) return null;

  return (
    <div
      className={`w-80 h-[520px] rounded-3xl shadow-2xl overflow-hidden relative bg-black transition-all duration-300
        ${user?.isPremium
          ? "border-2 border-yellow-400 shadow-yellow-400/40"
          : "border border-white/10"
        }`}
    >
      {/* Profile Image */}
      <div className="relative w-full h-full">
        <img
          src={
            user.photoUrl ||
            `https://i.pravatar.cc/1100?u=${user.firstName}`
          }
          alt="profile"
          className={`w-full h-full object-cover transition-all duration-300
            ${user?.isPremium ? "scale-105" : ""}
          `}
        />

        {/* Crown */}
        {user?.isPremium && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black 
            text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
            👑
          </div>
        )}

        {/* Dark Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-60 
          bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-5 left-5 text-white w-[85%]">

        {/* Name + Verified */}
        <h2 className="text-xl font-bold flex items-center gap-2">
          {user.firstName} {user.lastName}

          {user?.isPremium && (
            <span className="inline-flex items-center gap-1 
              bg-blue-500/20 text-blue-400 text-xs 
              px-2 py-0.5 rounded-full border border-blue-500/40 animate-pulse">
              ✔ Verified
            </span>
          )}
        </h2>

        {/* City */}
        <p className="text-sm opacity-80 mt-1">
          {user.city || "Unknown location"}
        </p>

        {/* About */}
        <p className="text-sm mt-2 opacity-80 line-clamp-3">
          {user.about || "No bio yet."}
        </p>

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreviewCard;