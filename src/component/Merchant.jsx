import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MerchantPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return <div>MerchantPage</div>;
};

export default MerchantPage;
