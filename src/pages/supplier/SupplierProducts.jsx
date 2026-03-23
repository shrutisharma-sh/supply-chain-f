import { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../../api/supplierApi";
import { useNavigate } from "react-router-dom";

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getMyProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      alert("Deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Products</h2>

      <button
  onClick={() => handleOrder(p.id)}
  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
>
  Order
</button>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
  key={p.id}
  className="border p-4 rounded shadow bg-white"
>
  <h3 className="text-lg font-semibold">{p.productName}</h3>

  <p className="text-gray-600">
    Supplier: {p.supplierCompany}
  </p>

  <p className="text-gray-600">
    SKU: {p.sku}
  </p>

  <div className="mt-2 text-sm">
    Base Price: ₹{p.price}
  </div>

  <div className="mt-2 text-sm">
    Supply Price: ₹{p.supplyPrice}
  </div>

  <div className="mt-2 text-sm">
    Category: {p.categoryName}
  </div>

  <div className="mt-2 text-sm">
    Min Order Qty: {p.minimumOrderQuantity}
  </div>

  <div className="mt-2 text-sm">
    Lead Time: {p.leadTimeDays} days
  </div>

  <div className="mt-2 text-sm">
    Status: {p.status}
  </div>

  <button
    onClick={() => handleDelete(p.id)}
    className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

  <button
    onClick={() =>
      navigate("/supplier/add-product", { state: { product: p } })
    }
    className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded mr-2"
  >
    Edit
  </button>
</div>
        ))}
      </div>
    </div>
  );
};

export default SupplierProducts;