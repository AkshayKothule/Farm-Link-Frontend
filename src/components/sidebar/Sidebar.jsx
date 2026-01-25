import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <aside className="w-64 bg-green-900 text-white flex flex-col px-6 py-8">
      <h2 className="text-2xl font-bold mb-10">🌿 FarmLink</h2>

      <nav className="space-y-3 text-sm font-medium">
        <SidebarItem
          label="Dashboard"
          active={isActive("/farmer")}
          onClick={() => navigate("/farmer")}
        />

        <SidebarItem
          label="Browse Equipment"
          active={isActive("/farmer/equipments")}
          onClick={() => navigate("/farmer/equipments")}
        />

        <SidebarItem
          label="My Rentals"
          active={isActive("/farmer/rentals")}
          onClick={() => navigate("/farmer/rentals")}
        />

        <SidebarItem
          label="Payments"
          active={isActive("/farmer/payments")}
          onClick={() => navigate("/farmer/payments")}
        />

        <SidebarItem
          label="Profile / Settings"
          active={isActive("/farmer/profile") || isActive("/farmer/settings")}
          onClick={() => navigate("/farmer/profile")}
        />
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto text-red-200 hover:text-white text-sm font-semibold"
      >
        ⏻ Logout
      </button>
    </aside>
  );
}
