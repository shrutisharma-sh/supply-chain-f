import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h2 className="font-bold">Supply Chain</h2>

        <div className="space-x-4">
          {!token ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          ) : (
            <button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          )}
        </div>
      </div>

      {/* hero section */}
      <div className="flex flex-col justify-center items-center h-[80%]">
        <h1 className="text-3xl font-bold mb-4">
          Smart Supply Chain System
        </h1>
        <p className="text-gray-600">
          Manage products, suppliers, and orders efficiently
        </p>
      </div>
    </div>
  );
}