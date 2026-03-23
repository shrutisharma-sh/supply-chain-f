import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

import { useNavigate } from "react-router-dom";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow">
  <h3 className="font-bold">{p.name}</h3>
  <p>Price: ₹{p.price}</p>
  <p>Status: {p.status}</p>

  
  <button
    onClick={() => navigate(`/products/${p.id}/suppliers`)}
    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
  >
    View Suppliers
  </button>
</div>
          ))}
        </div>
      )}
    </div>
  );
}