import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Sidebar from "../../components/sidebar/OwnerSidebar";

export default function OwnerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* SIDEBAR */}
      <Sidebar onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
