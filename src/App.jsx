import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";


import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import AddProduct from "./pages/supplier/AddProduct";
import SupplierProducts from "./pages/supplier/SupplierProducts";


const Admin = () => <h2>Admin Dashboard</h2>;
const Supplier = () => <h2>Supplier Dashboard</h2>;
const Manager = () => <h2>Manager Dashboard</h2>;
const Dashboard = () => <h2>User Dashboard</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* for public */}
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
{/* auth required routes */}
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Admin />
    </ProtectedRoute>
  }
/>

<Route
  path="/supplier"
  element={
    <ProtectedRoute allowedRoles={["SUPPLIER"]}>
      <SupplierDashboard />
    </ProtectedRoute>
  }
>
  <Route path="products" element={<SupplierProducts />} />
  <Route path="add-product" element={<AddProduct />} />
  <Route
  path="/supplier-products"
  element={
    <ProtectedRoute allowedRoles={["SUPPLIER"]}>
      <SupplierProducts />
    </ProtectedRoute>
  }
/>
</Route>

<Route
  path="/manager"
  element={
    <ProtectedRoute allowedRoles={["MANAGER"]}>
      <Manager />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;