import { Link, Outlet } from "react-router-dom";

const SupplierDashboard = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Supplier Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/supplier/products">My Products</Link>
          <Link to="/supplier/add-product">Add Product</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
      
    </div>
  );
};

export default SupplierDashboard;