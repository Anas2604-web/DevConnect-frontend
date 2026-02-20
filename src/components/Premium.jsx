import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import confetti from "canvas-confetti";
import { URL } from "../utils/constants";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const isPremium = user?.isPremium;

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan);

      const { data } = await axios.post(
        URL +  "/payment/create",
        { plan },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        handler: async function (response) {
          await axios.post(
           URL + "/payment/verify",
            response,
            { withCredentials: true }
          );

          launchConfetti();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 
      px-4 sm:px-6 py-16 text-white">

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Upgrade to Premium 🚀
        </h1>
        <p className="opacity-70 mt-2 text-sm sm:text-base">
          Unlock powerful features and stand out on DevConnect
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

        <div className="card bg-white/5 backdrop-blur-md 
          border border-white/10 shadow-xl rounded-2xl 
          hover:shadow-indigo-500/30 hover:scale-105 
          transition duration-300">

          <div className="card-body">

            <h2 className="text-xl sm:text-2xl font-bold text-center">
              🥈 Silver Plan
            </h2>

            <p className="text-center text-2xl sm:text-3xl font-extrabold mt-2">
              ₹199
            </p>

            <ul className="mt-6 space-y-3 opacity-80 text-sm sm:text-base">
              <li>✔ 50 Extra Swipes</li>
              <li>✔ Priority Visibility</li>
              <li>✔ Profile Highlight</li>
            </ul>

            <button
              disabled={isPremium}
              onClick={() => handlePayment("silver")}
              className={`btn w-full mt-8 rounded-xl h-12 
                ${isPremium 
                  ? "btn-disabled" 
                  : "btn-outline btn-primary hover:shadow-lg hover:shadow-indigo-500/40"
                }`}
            >
              {isPremium
                ? "Already Premium 🔒"
                : loadingPlan === "silver"
                ? "Processing..."
                : "Choose Silver"}
            </button>

          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500/10 to-indigo-500/10 
          backdrop-blur-md border border-yellow-400/40 
          shadow-2xl rounded-2xl relative 
          hover:shadow-yellow-400/40 hover:scale-105 
          transition duration-300">

          <div className="absolute top-4 right-4 
            bg-yellow-400 text-black text-xs px-3 py-1 
            rounded-full font-semibold">
            MOST POPULAR
          </div>

          <div className="card-body">

            <h2 className="text-xl sm:text-2xl font-bold text-center text-yellow-400">
              🥇 Gold Plan
            </h2>

            <p className="text-center text-2xl sm:text-3xl font-extrabold mt-2">
              ₹499
            </p>

            <ul className="mt-6 space-y-3 opacity-90 text-sm sm:text-base">
              <li>✔ Unlimited Swipes</li>
              <li>✔ Blue Verified Badge</li>
              <li>✔ Unlimited Chat</li>
              <li>✔ Profile Boost</li>
              <li>✔ Priority Support</li>
            </ul>

            <button
              disabled={isPremium}
              onClick={() => handlePayment("gold")}
              className={`btn w-full mt-8 rounded-xl h-12 
                ${isPremium 
                  ? "btn-disabled" 
                  : "btn-warning hover:shadow-lg hover:shadow-yellow-400/40"
                }`}
            >
              {isPremium
                ? "Already Premium 👑"
                : loadingPlan === "gold"
                ? "Processing..."
                : "Go Gold 👑"}
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Premium;
