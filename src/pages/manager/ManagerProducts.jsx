import { useEffect, useState } from "react";
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "../../api/managerApi";

const ManagerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getPendingProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveProduct(id);
      alert("Approved");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectProduct(id);
      alert("Rejected");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Products</h2>

      {products.length === 0 && <p>No pending products</p>}

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow bg-white">

            <h3 className="text-lg font-semibold">{p.productName}</h3>

            <div>Supplier: {p.supplierCompany}</div>
            <div>Product Price: ₹{p.price}</div>
            <div>Supply Price: ₹{p.supplyPrice}</div>
            <div>MOQ: {p.minimumOrderQuantity}</div>
            <div>Lead Time: {p.leadTimeDays} days</div>
            <div>Status: {p.status}</div>

            <div className="mt-3 space-x-2">
              <button
                onClick={() => handleApprove(p.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerProducts;