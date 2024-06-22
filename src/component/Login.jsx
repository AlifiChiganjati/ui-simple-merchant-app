import { useState } from "react";
import { loginUser } from "../service/auth/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    clearError(e.target.name);
  };

  const clearError = (fieldName) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login.username) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: "Email tidak boleh kosong.",
      }));
      return;
    }

    if (!login.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password tidak boleh kosong.",
      }));
      return;
    }

    try {
      const response = await loginUser(login.username, login.password);
      console.log("ini response: ", response);
      if (response.status === "success") {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status >= 400) {
        setError(error.response.data.message);
        console.log(error.response);
      }
    }
  };
  return (
    <section className="flex h-screen items-center justify-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded bg-gray-900 p-6"
      >
        <div className="mb-4">
          {error && <div className="text-sm text-red-500">{error}</div>}
          <p className="text-gray-400">Login</p>
          <h2 className="text-xl font-bold text-white">Join our App</h2>
        </div>
        <div>
          <input
            className="w-full rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none"
            type="email"
            name="username"
            placeholder="Email"
            value={login.username}
            onChange={handleChange}
          />
          {validationErrors.username && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.username}
            </p>
          )}
        </div>
        <div>
          <input
            className="w-full rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.password}
            </p>
          )}
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
              Don&apos;t have an account?
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
