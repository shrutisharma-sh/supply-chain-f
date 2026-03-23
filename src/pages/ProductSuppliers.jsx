import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { placeOrder } from "../api/orderApi";

const ProductSuppliers = () => {
  const { productId } = useParams();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(
        `/public/products/${productId}/suppliers`
      );
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load suppliers");
    }
  };

  
  const handleOrder = async (supplierProductId) => {
    try {
      const quantity = prompt("Enter quantity");
      if (!quantity) return;

      await placeOrder({
        supplierProductId,
        quantity: Number(quantity),
      });

      alert("Order placed successfully ");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Available Suppliers</h2>

      {suppliers.length === 0 ? (
        <p>No suppliers found</p>
      ) : (
        <div className="grid gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="border p-4 rounded shadow">
              
              <h3 className="font-bold">{s.productName}</h3>

              <p>Supplier: {s.supplierCompany}</p>
              <p>Price: ₹{s.supplyPrice}</p>
              <p>Min Qty: {s.minimumOrderQuantity}</p>
              <p>Lead Time: {s.leadTimeDays} days</p>
              <p>Status: {s.status}</p>

              
              <button
                onClick={() => handleOrder(s.id)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                Place Order
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSuppliers;