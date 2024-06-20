import { createBrowserRouter } from "react-router-dom";
import MerchantPage from "./component/Merchant";
import ProductPage from "./component/Product";
import LoginPage from "./component/Login";
import RegisterPage from "./component/Register";
import HeroPage from "./component/Hero";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/merchant",
    element: <MerchantPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
