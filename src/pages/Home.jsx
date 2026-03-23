import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="h-screen bg-gray-100">

      <div className="flex flex-col justify-center items-center h-[80%]">
        <h1 className="text-3xl font-bold mb-4">
          Smart Supply Chain System
        </h1>

        <p className="text-gray-600 mb-4">
          Manage products, suppliers, and orders efficiently
        </p>

        {!token && (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Started
          </button>
        )}
      </div>
      <div className="mt-6">
  <button onClick={() => navigate("/marketplace")}>
  Browse Supplier Products
</button>
</div>
    </div>
  );
}