import { useState } from "react";
import Navbar from "./Navbar";
import { registerMerchant } from "../service/merchant/merchant";
import { useNavigate } from "react-router-dom";

const RegisterMerchantForm = () => {
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState({
    merchantName: "",
    merchantAddress: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  if (!localStorage.getItem("user")) {
    navigate("/login");
  }
  const clearError = (fieldName) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
    setError("");
  };

  const handleChange = (e) => {
    setMerchant({
      ...merchant,
      [e.target.name]: e.target.value,
    });
    clearError(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!merchant.merchantName) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        merchantName: "Nama toko tidak boleh kosong.",
      }));
      return;
    }

    if (!merchant.merchantAddress) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        merchantAddress: "Alamat toko tidak boleh kosong.",
      }));
      return;
    }

    try {
      const user = localStorage.getItem("user");
      let token = JSON.parse(user).token;
      const userId = JSON.parse(user).userData.userId;
      const response = await registerMerchant(
        merchant.merchantName,
        merchant.merchantAddress,
        userId,
        token,
      );

      setMessage(response.message);
      navigate("/product", { replace: true });
    } catch (error) {
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex h-screen flex-col items-center justify-center bg-gray-600">
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-lg bg-gray-800 p-6"
        >
          <h1 className="mb-10 text-center text-3xl font-bold text-white">
            Daftar Toko Anda
          </h1>
          {message && <div className="text-sm text-green-500">{message}</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="mb-6">
            <label
              htmlFor="merchantName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama Toko
            </label>
            <input
              type="text"
              id="merchantName"
              name="merchantName"
              value={merchant.merchantName}
              onChange={handleChange}
              className={`block w-full ${
                validationErrors.merchantName
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
            />
            {validationErrors.merchantName && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.merchantName}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="merchantAddress"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Alamat Toko
            </label>
            <input
              type="text"
              id="merchantAddress"
              name="merchantAddress"
              value={merchant.merchantAddress}
              onChange={handleChange}
              className={`block w-full ${
                validationErrors.merchantAddress
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
            />
            {validationErrors.merchantAddress && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.merchantAddress}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-400 px-4 py-2 text-center text-xl font-bold text-gray-200 shadow transition duration-300 hover:bg-blue-500 hover:text-white hover:shadow-blue-500"
          >
            Daftar
          </button>
        </form>
      </section>
    </>
  );
};

export default RegisterMerchantForm;
