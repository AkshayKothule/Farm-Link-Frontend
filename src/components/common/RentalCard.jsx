import api from "../../services/api";

export default function OwnerRentalCard({ rental, role, onAction }) {

  const approveRental = async () => {
    await api.put(`/rentals/owner/${rental.rentalId}/approve`);
    onAction();
  };

  const rejectRental = async () => {
    await api.put(`/rentals/owner/${rental.rentalId}/reject`);
    onAction();
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">

      {/* LEFT INFO */}
      <div>
        <h4 className="font-semibold text-green-900">
          {rental.equipmentName}
        </h4>

        <p className="text-xs text-gray-500">
          {rental.startDate} → {rental.endDate}
        </p>

        {/* OWNER VIEW → show farmer */}
        {role === "OWNER" && (
          <p className="text-sm mt-1">
            Farmer: <b>{rental.farmerName}</b>
          </p>
        )}

        {/* FARMER VIEW → show owner */}
        {role === "FARMER" && (
          <p className="text-sm mt-1">
            Owner: <b>{rental.ownerName}</b>
          </p>
        )}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">

        {/* STATUS BADGE */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            rental.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : rental.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : rental.status === "COMPLETED"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {rental.status}
        </span>

        {/* 🔥 OWNER ACTIONS */}
        {role === "OWNER" && rental.status === "PENDING" && (
          <>
            <button
              onClick={approveRental}
              className="bg-green-600 text-white px-3 py-1 rounded text-xs"
            >
              Approve
            </button>

            <button
              onClick={rejectRental}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs"
            >
              Reject
            </button>
          </>
        )}

        {/* 🔥 FARMER ACTIONS */}
        {role === "FARMER" && rental.status === "APPROVED" && (
          <span className="text-xs text-green-700 font-semibold">
            Approved ✔
          </span>
        )}
      </div>
    </div>
  );
}
