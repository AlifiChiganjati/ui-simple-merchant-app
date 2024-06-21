import { useState } from "react";
import { registerUser } from "../service/auth/auth";

const RegisterPage = () => {
  const [register, setRegister] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });

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

    if (!register.fullname) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        fullname: "Fullname tidak boleh kosong.",
      }));
      return;
    }

    if (!register.email) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email tidak boleh kosong.",
      }));
      return;
    }

    if (!register.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password tidak boleh kosong.",
      }));
      return;
    }

    try {
      const response = await registerUser(
        register.fullname,
        register.email,
        register.password,
      );

      setMessage(response.message);

      setRegister({ fullname: "", email: "", password: "" });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
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
          {message && <div className="text-sm text-green-500">{message}</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          <p className="text-gray-400">Register</p>
          <h2 className="text-xl font-bold text-white">Join our App</h2>
        </div>
        <div>
          <input
            className={`w-full rounded border ${
              validationErrors.fullname ? "border-red-500" : "border-gray-200"
            } bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none`}
            type="text"
            placeholder="Fullname"
            name="fullname"
            value={register.fullname}
            onChange={handleChange}
          />
          {validationErrors.fullname && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.fullname}
            </p>
          )}
        </div>
        <div>
          <input
            className={`w-full rounded border ${
              validationErrors.email ? "border-red-500" : "border-gray-200"
            } bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none`}
            type="email"
            name="email"
            placeholder="Email"
            value={register.email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-500">
              {validationErrors.email}
            </p>
          )}
        </div>
        <div>
          <input
            className={`w-full rounded border ${
              validationErrors.password ? "border-red-500" : "border-gray-200"
            } bg-gray-50 p-4 text-sm text-gray-600 focus:outline-none`}
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
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
            Register
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-sm text-blue-600 hover:underline"
              href={"/login"}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
