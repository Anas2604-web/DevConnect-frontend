import { useNavigate } from "react-router-dom";

const UpgradeModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-indigo-900 
        p-8 rounded-3xl shadow-2xl text-white w-[90%] max-w-md text-center">

        <h2 className="text-2xl font-bold mb-4">
          🚫 Daily Swipe Limit Reached
        </h2>

        <p className="opacity-80 mb-6">
          You've used all your free swipes today.
          Upgrade to Silver or Gold and unlock more connections.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/premium")}
            className="px-6 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:scale-105 transition"
          >
            Upgrade Now 🚀
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;