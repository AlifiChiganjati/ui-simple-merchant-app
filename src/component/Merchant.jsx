import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCreateForm from "./FormCreateProduct";

const MerchantPage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userRole = JSON.parse(user).userData.role;

  return (
    <>
      <Navbar />
      <section className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-400">
        {userRole === "MERCHANT" ? (
          <ProductCreateForm />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1 className="text-center text-5xl font-bold text-gray-100">
              Belum Punya Toko
            </h1>
            <button
              onClick={() => navigate("/merchant/register", { replace: true })}
              className="rounded-lg bg-blue-500 px-6 py-2 text-xl font-bold text-white transition duration-300 hover:bg-blue-700"
            >
              Buat Toko
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default MerchantPage;
