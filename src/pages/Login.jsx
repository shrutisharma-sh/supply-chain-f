import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { getUserRole } from "../utils/jwt";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser({
      email,
      password,
    });

    const token = response.token;

    
    localStorage.setItem("token", token);

    
    const role = getUserRole(token);

    console.log("Role:", role);

    
    localStorage.setItem("role", role);

    setMessage("Login successful");

    
    setTimeout(() => {
      if (role === "ADMIN") navigate("/admin");
      else if (role === "SUPPLIER") navigate("/supplier");
      else if (role === "MANAGER") navigate("/manager");
      else navigate("/dashboard");
    }, 1000);

  } catch (error) {
    console.error("Login failed:", error);
    setMessage("Invalid email or password");
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

         {message && (
         <p
         className={`mt-3 text-center text-sm ${
          message.includes("successful")
         ? "text-green-500"
         : "text-red-500"
         }`}
        >
    {message}
  </p>
)}
       
        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}