import { useEffect, useState } from "react";
import DashboardCard from "../../components/common/DashboardCard";
import RentalCard from "../../components/common/RentalCard";
import { getOwnerRentals } from "../../services/ownerService";

export default function OwnerDashboard() {

  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      const res = await getOwnerRentals();
      setRentals(res.data);
    } catch (err) {
      console.error("Failed to load owner rentals", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔢 Dashboard stats
  const totalRentals = rentals.length;
  const pendingRequests = rentals.filter(r => r.status === "PENDING").length;
  const approvedRentals = rentals.filter(r => r.status === "APPROVED").length;

  return (
    <div>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-1">Owner Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Manage your equipments and rental requests
      </p>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Rentals"
          value={totalRentals}
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests}
        />
        <DashboardCard
          title="Approved Rentals"
          value={approvedRentals}
        />
      </div>

      {/* RENTAL REQUESTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Rental Requests</h2>

        {loading ? (
          <p>Loading...</p>
        ) : rentals.length === 0 ? (
          <p className="text-gray-500">No rental requests</p>
        ) : (
          <div className="grid gap-4">
            {rentals.map(rental => (
              <RentalCard
                key={rental.rentalId}
                rental={rental}
                role="OWNER"
                onAction={loadRentals}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
