import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { logout } from "../../redux/slices/authSlice";

export default function FarmerDashboard() {
  const [rentals, setRentals] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= LOAD DASHBOARD =================
  useEffect(() => {
    setLoading(true);

    Promise.all([
      api.get("/rentals/farmer"),
      api.get("/farmers/profile"),
    ])
      .then(([rentalsRes, farmerRes]) => {
        setRentals(rentalsRes.data || []);
        setFarmer(farmerRes.data);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  // ================= CANCEL RENTAL =================
  const cancelRental = (id) => {
    api.delete(`/rentals/farmer/${id}`)
      .then(() => {
        setRentals(prev => prev.filter(r => r.id !== id));
      })
      .catch(() => {
        alert("Failed to cancel rental");
      });
  };

  // ================= UI STATES =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-green-50">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-green-900 text-white flex flex-col px-6 py-8">

        <h2 className="text-2xl font-bold mb-10">
          🌿 FarmLink
        </h2>

        <nav className="space-y-3 text-sm font-medium">
          <SidebarItem
            active
            label="Dashboard"
            onClick={() => navigate("/farmer/dashboard")}
          />
          <SidebarItem
            label="Browse Equipment"
            onClick={() => navigate("/farmer/equipments")}
          />
          <SidebarItem
            label="Profile"
            onClick={() => navigate("/farmer/profile")}
          />
        </nav>

        <button
          onClick={handleLogout}
          className="
            mt-auto flex items-center gap-2
            text-red-200 hover:text-white
            text-sm font-semibold transition
          "
        >
          ⏻ Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 sm:p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900">
            Hello {farmer?.firstName || "Farmer"} 👨‍🌾
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your rentals and farming activities
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <StatCard title="Total Requests" value={rentals.length} />
          <StatCard
            title="Approved Rentals"
            value={rentals.filter(r => r.status === "APPROVED").length}
          />
          <StatCard
            title="Pending Requests"
            value={rentals.filter(r => r.status === "PENDING").length}
          />
        </div>

        {/* RENTALS LIST */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            My Rental Requests
          </h2>

          {rentals.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No rental requests yet.
            </p>
          ) : (
            <div className="space-y-4">
              {rentals.map(r => (
                <RentalCard
                  key={r.id}
                  rental={r}
                  onCancel={cancelRental}
                />
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-green-700 text-white"
          : "text-green-200 hover:bg-green-800"
      }`}
    >
      {label}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </p>
    </div>
  );
}

function RentalCard({ rental, onCancel }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border rounded-xl p-4">

      <div>
        <h4 className="font-semibold text-gray-800">
          {rental.equipmentName}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {rental.startDate} → {rental.endDate}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            rental.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : rental.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {rental.status}
        </span>

        {rental.status === "PENDING" && (
          <button
            onClick={() => onCancel(rental.id)}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

    </div>
  );
}
