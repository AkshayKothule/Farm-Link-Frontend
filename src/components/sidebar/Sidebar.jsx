import { useLocation, useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 bg-green-900 text-white flex flex-col px-6 py-8">
      <h2 className="text-2xl font-bold mb-10">🌿 FarmLink</h2>

      <nav className="space-y-3 text-sm font-medium">
        <SidebarItem
          label="Dashboard"
          active={location.pathname === "/farmer"}
          onClick={() => navigate("/farmer")}
        />
        <SidebarItem
          label="Browse Equipment"
          active={location.pathname.includes("equipments")}
          onClick={() => navigate("/farmer/equipments")}
        />
        <SidebarItem
          label="Profile"
          active={location.pathname.includes("profile")}
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
