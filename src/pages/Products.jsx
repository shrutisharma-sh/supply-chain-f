import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
            <div
              key={p.id}
              className="border p-4 rounded shadow"
            >
              <h3 className="font-bold">{p.name}</h3>
              <p>Price: ₹{p.price}</p>
              <p>Status: {p.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}