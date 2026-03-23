import { Outlet } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="font-bold">Manager Panel</h2>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerDashboard;