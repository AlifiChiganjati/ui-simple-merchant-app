import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProductPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Navbar></Navbar>
      <section>sudah</section>
    </>
  );
};

export default ProductPage;
