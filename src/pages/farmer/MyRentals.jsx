import { useEffect, useState } from "react";
import api from "../../services/api";
import RentalCard from "../../components/common/RentalCard";
import PaymentModal from "../../components/modals/PaymentModal";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);

  const loadRentals = () => {
    setLoading(true);
    api.get("/rentals/farmer")
      .then(res => setRentals(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const cancelRental = (id) => {
    if (!window.confirm("Cancel this rental request?")) return;

    api.delete(`/rentals/farmer/${id}`)
      .then(() => loadRentals())
      .catch(err => alert(err.response?.data || "Failed to cancel"));
  };

  if (loading) {
    return <p className="text-green-700 font-semibold">Loading rentals...</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        My Rental Requests 📋
      </h1>

      {rentals.length === 0 ? (
        <p className="text-gray-500">No rental requests yet.</p>
      ) : (
        <div className="space-y-4">
          {rentals.map(rental => (
            <RentalCard
              key={rental.rentalId}
              rental={rental}
              onCancel={cancelRental}
              onPay={() => setSelectedRental(rental)}
            />
          ))}
        </div>
      )}

      {selectedRental && (
        <PaymentModal
          rental={selectedRental}
          onClose={() => setSelectedRental(null)}
          onSuccess={() => {
            setSelectedRental(null);
            loadRentals();
          }}
        />
      )}
    </>
  );
}
