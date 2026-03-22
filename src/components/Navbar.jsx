import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };


  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h2 className="font-bold">Supply Chain</h2>

      <div className="space-x-4">

       
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>


        {token && (
          <>
            {role === "ADMIN" && (
              <button onClick={() => navigate("/admin")}>Admin</button>
            )}

            {role === "SUPPLIER" && (
              <button onClick={() => navigate("/supplier")}>Supplier</button>
            )}

            {role === "MANAGER" && (
              <button onClick={() => navigate("/manager")}>Manager</button>
            )}

            {role === "USER" && (
              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>
            )}

            <button onClick={() => navigate("/products")}>
              Products
            </button>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}