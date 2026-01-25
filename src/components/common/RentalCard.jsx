import { useState } from "react";
import PaymentModal from "../modals/PaymentModal";

export default function RentalCard({ rental, refreshDashboard }) {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">

        {/* LEFT */}
        <div>
          <h4 className="font-semibold text-gray-800">
            {rental.equipmentName}
          </h4>

          <p className="text-xs text-gray-500">
            {rental.startDate} → {rental.endDate}
          </p>

          <p className="text-sm font-medium mt-1">
            Owner: {rental.ownerName}
          </p>

          {rental.totalAmount && (
            <p className="text-sm font-semibold text-green-700 mt-1">
              Amount: ₹{rental.totalAmount}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* STATUS */}
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

          {/* PAY NOW */}
          {rental.status === "APPROVED" && (
            <button
              onClick={() => setShowPayment(true)}
              className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700 transition"
            >
              Pay Now
            </button>
          )}

          {/* PAID */}
          {rental.status === "COMPLETED" && (
            <span className="text-green-700 text-xs font-semibold">
              Paid ✅
            </span>
          )}
        </div>
      </div>

      {/* ===== PAYMENT MODAL ===== */}
      {showPayment && (
        <PaymentModal
          rental={rental}
          onClose={() => setShowPayment(false)}
          onSuccess={() => {
            setShowPayment(false);
            refreshDashboard();
          }}
        />
      )}
    </>
  );
}
