import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import ProductPage from "../pages/ProductPage";
import Signup from "../pages/Signup";

export const appRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/products",
    element: <ProductPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
];
