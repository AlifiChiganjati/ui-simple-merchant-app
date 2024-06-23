import { useNavigate } from "react-router-dom";
import { logoutUser } from "../service/auth/auth";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex items-center justify-between bg-gray-800">
      <h1 className="p-4 text-2xl font-bold italic text-white">Merchant APP</h1>
      <ul className="flex items-center gap-4 p-4">
        <li>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="text-xl font-semibold capitalize text-gray-200 transition duration-300 hover:text-white"
          >
            home
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/merchant", { replace: true })}
            className="text-xl font-semibold capitalize text-gray-200 transition duration-300 hover:text-white"
          >
            merchant
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/product", { replace: true })}
            className="text-xl font-semibold capitalize text-gray-200 transition duration-300 hover:text-white"
          >
            product
          </button>
        </li>
        {user ? (
          <button
            onClick={handleLogout}
            className="rounded border border-gray-200 bg-blue-500 px-4 py-1 font-semibold capitalize text-gray-200 transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="rounded border border-gray-200 bg-blue-500 px-4 py-1 font-semibold capitalize text-gray-200 transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            login
          </button>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
