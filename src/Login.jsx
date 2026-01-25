const Login = () => {
  return (
    <div className="flex items-center justify-center bg-linear-to-b from-base-200 to-base-300 px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-content/10 rounded-2xl">
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back 👨🏻‍💻</h2>
            <p className="text-base-content/70 mt-2">
              Login to continue to <span className="font-semibold">DevConnect</span>
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full rounded-xl bg-base-200 focus:outline-none focus:border-primary"
              />
            </label>

            <label className="form-control w-full">
              <div className="label flex justify-between mt-2">
                <span className="label-text">Password</span>
                <a className="link link-hover text-sm text-primary">Forgot?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full rounded-xl bg-base-200 focus:outline-none focus:border-primary"
              />
            </label>

            <button className="btn btn-primary w-full rounded-xl mt-4">
              Login
            </button>

            <p className="text-center text-sm text-base-content/70 mt-4">
              Don’t have an account?{" "}
              <a className="link link-primary link-hover font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
