import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

 
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h2 className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        Supply Chain
      </h2>

      <div className="space-x-4">

        {!token && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}

        {token && role === "SUPPLIER" && (
          <>
            <button onClick={() => navigate("/supplier/products")}>
              My Products
            </button>
            <button onClick={() => navigate("/supplier/add-product")}>
              Add Product
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {token && role === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")}>
              Admin Panel
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {token && role === "USER" && (
          <>
            <button onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {token && role === "MANAGER" && (
          <>
            <button onClick={() => navigate("/manager")}>
              Manager Panel
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

      </div>
    </div>
  );
};

export default Navbar;