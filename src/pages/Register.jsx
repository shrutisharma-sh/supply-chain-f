import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    companyName: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  let dataToSend = { ...formData };
  if (formData.role !== "SUPPLIER") {
    dataToSend.companyName = "N/A";
  }
  try {
    const response = await registerUser(dataToSend);
    console.log("Register success:", response);
    localStorage.setItem("token", response.token);
    setMessage("Registration successful ");
    navigate("/login");

  } catch (error) {
    console.error("Register failed:", error);
    setMessage("Registration failed");
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
        />

      
        <select
          name="role"
          className="w-full p-2 border mb-2"
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPPLIER">SUPPLIER</option>
          <option value="MANAGER">MANAGER</option>
        </select>

        
        {formData.role === "SUPPLIER" && (
          <input
            name="companyName"
            placeholder="Company Name"
            className="w-full p-2 border mb-2"
            onChange={handleChange}
          />
        )}

        <button className="w-full bg-blue-500 text-white p-2">
          Register
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
      </form>
    </div>
  );
}