import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function OwnerLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // JWT clear
    navigate("/login");                 // redirect
  };

  const linkClass = ({ isActive }) =>
    `block p-2 rounded transition ${
      isActive ? "bg-green-700" : "hover:bg-green-700"
    }`;

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-green-900 text-white flex flex-col">

        {/* LOGO */}
        <div className="p-6 text-2xl font-bold">
          🌿 FarmLink
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 space-y-2">
          <NavLink to="/owner/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/owner/equipments" className={linkClass}>
            My Equipments
          </NavLink>

          <NavLink to="/owner/profile" className={linkClass}>
            Profile
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-300"
          >
            ⏻ Logout
          </button>
        </div>

      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-green-50 p-8">
        <Outlet />
      </main>

    </div>
  );
}
