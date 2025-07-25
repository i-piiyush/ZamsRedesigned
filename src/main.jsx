import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AddToCart from "./components/AddToCart.jsx";
import Searchbar from "./components/Searchbar.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      <CartProvider>
        <FilterProvider>
          <App />

          <AddToCart />
          <Searchbar />
        </FilterProvider>{" "}
      </CartProvider>
    </ProductProvider>
  </BrowserRouter>
);
