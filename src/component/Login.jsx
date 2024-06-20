const LoginPage = () => {
  return (
    <section className="flex h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-md space-y-4 rounded bg-gray-900 p-6">
        <div className="mb-4">
          <p className="text-gray-400">Login</p>
          <h2 className="text-xl font-bold text-white">Join our App</h2>
        </div>
        <div>
          <input
            className="w-full rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="w-full rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button className="w-full rounded bg-blue-600 py-4 text-sm font-bold text-gray-50 transition duration-200 hover:bg-blue-700">
            Sign In
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-sm text-blue-600 hover:underline"
              href={"/register"}
            >
              Don't have an account?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
