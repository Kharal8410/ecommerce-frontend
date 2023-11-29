import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import PageNotFound from "./pages/error/NotFound";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Products from "./pages/admin/Products";
import SecureRoute from "./routes/SecureRoute";
import UserProducts from "./pages/users/Products";
import AdminRoute from "./routes/AdminRoute";
import ProductDetail from "./components/user/ProductDetail";
import Cart from "./components/user/Cart";
import CheckoutState from "./context/CheckoutState";
import ParentContainer from "./pages/users/ParentContainer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<SecureRoute />}>
          <Route path="" element={<AdminRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/all/products" element={<UserProducts />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout-step"
            element={
              <CheckoutState>
                <ParentContainer />
              </CheckoutState>
            }
          />

          <Route path="/products/:productId" element={<ProductDetail />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
