import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import CreateProduct from "./pages/createproduct/CreateProduct";
import ProductList from "./pages/listproduct/ProductList";
import Layout from "./layout/Layout";
import Cart from "./pages/cartpage/Cart";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route (NO header) */}
        <Route path="/" element={<Login />} />

        {/* Routes WITH header */}
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/Cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
