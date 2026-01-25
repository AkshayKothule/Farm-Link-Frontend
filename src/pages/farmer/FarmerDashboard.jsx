import { useEffect, useState } from "react";
import api from "../../services/api";

import StatCard from "../../components/common/StatCard";
import RentalCard from "../../components/common/RentalCard";
import PaymentModal from "../../components/modals/PaymentModal";

export default function FarmerDashboard() {
  const [rentals, setRentals] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);

  const loadDashboard = () => {
    Promise.all([
      api.get("/rentals/farmer"),
      api.get("/farmers/profile"),
    ]).then(([rentalsRes, farmerRes]) => {
      setRentals(rentalsRes.data || []);
      setFarmer(farmerRes.data);
    });
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // 🔹 PAY CLICK
  const handlePay = (rental) => {
    setSelectedRental(rental);
  };

  return (
    <>
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

      {/* RENTALS */}
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
            {rentals.map(rental => (
              <RentalCard
                key={rental.rentalId}
                rental={rental}
                onPay={handlePay}   // ✅ PAYMENT ACTION
                
              />
            ))}
          </div>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {selectedRental && (
        <PaymentModal
          rental={selectedRental}
          onClose={() => setSelectedRental(null)}
          onSuccess={() => {
            setSelectedRental(null);
            loadDashboard(); // refresh after payment
          }}
        />
      )}
    </>
  );
}
