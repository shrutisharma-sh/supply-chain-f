import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../../api/supplierApi";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCategories } from "../../api/categoryApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editProduct = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    categoryId: "",
    supplyPrice: "",
    minimumOrderQuantity: "",
    leadTimeDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    }
  };

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        description: editProduct.description || "",
        sku: editProduct.sku || "",
        price: editProduct.price || "",
        categoryId: editProduct.categoryId || "",
        supplyPrice: editProduct.supplyPrice || "",
        minimumOrderQuantity: editProduct.minimumOrderQuantity || "",
        leadTimeDays: editProduct.leadTimeDays || "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const requiredFields = [
      "name",
      "sku",
      "price",
      "categoryId",
      "supplyPrice",
      "minimumOrderQuantity",
      "leadTimeDays",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the ${field}`);
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        supplyPrice: Number(formData.supplyPrice),
        minimumOrderQuantity: Number(formData.minimumOrderQuantity),
        leadTimeDays: Number(formData.leadTimeDays),
      };

      if (editProduct) {
        await updateProduct(editProduct.id, payload);
        alert("Product updated");
      } else {
        await addProduct(payload);
        alert("Product added");
      }

      navigate("/supplier-products");
    } catch (err) {
      console.error(err);
      alert("Operation failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        {editProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="sku"
          value={formData.sku}
          placeholder="SKU"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Supplier-specific fields */}
        <input
          type="number"
          name="supplyPrice"
          value={formData.supplyPrice}
          placeholder="Supply Price"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="minimumOrderQuantity"
          value={formData.minimumOrderQuantity}
          placeholder="Minimum Order Quantity"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="leadTimeDays"
          value={formData.leadTimeDays}
          placeholder="Lead Time (Days)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading
            ? "Processing..."
            : editProduct
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;