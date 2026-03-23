import { useEffect, useState } from "react";
import axios from "../api/axios";
import { placeOrder } from "../api/orderApi";

const AllSupplierProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("/public/supplier-products");
    setProducts(res.data);
  };

  const handleOrder = async (id) => {
    const quantity = prompt("Enter quantity");
    if (!quantity) return;

    await placeOrder({
      supplierProductId: id,
      quantity: Number(quantity),
    });

    alert("Order placed ");
  };

  return (
    <div className="p-6">
      <h2>All Supplier Products</h2>

      {products.map((p) => (
        <div key={p.id} className="border p-3 mt-3">
          <h3>{p.productName}</h3>
          <p>Supplier: {p.supplierCompany}</p>
          <p>Price: ₹{p.supplyPrice}</p>

          <button onClick={() => handleOrder(p.id)}>
            Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllSupplierProducts;