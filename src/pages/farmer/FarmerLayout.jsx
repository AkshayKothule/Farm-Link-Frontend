import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Sidebar from "../../components/sidebar/Sidebar";
import { logout } from "../../redux/slices/authSlice";

export default function FarmerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* FIXED SIDEBAR */}
      <Sidebar onLogout={handleLogout} />

      {/* DYNAMIC CONTENT */}
      <main className="flex-1 p-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
