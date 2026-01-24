
import { NavLink } from "react-router-dom";

export default function OwnerLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">
          🌿 FarmLink
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink className="block p-2 rounded bg-green-700" to="/owner/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="block p-2 rounded hover:bg-green-700" to="/owner/equipments">
            My Equipments
          </NavLink>
          <NavLink className="block p-2 rounded hover:bg-green-700" to="/owner/profile">
            Profile
          </NavLink>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button className="flex items-center gap-2">
            ⏻ Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-green-50 p-8">
        {children}
      </main>
    </div>
  );
}
