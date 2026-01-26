import { useState } from "react";
import RentalRequestModal from "../modals/RentalRequestModal";

export default function EquipmentCard({ equipment }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col">

        {/* ===== HEADER ===== */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-green-900">
            {equipment.name}
          </h3>
          <p className="text-xs text-gray-500">
            Category: {equipment.category}
          </p>
        </div>

        {/* ===== DESCRIPTION ===== */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {equipment.description || "No description available"}
        </p>

        {/* ===== OWNER INFO ===== */}
        <div className="text-sm text-gray-700 mb-3">
          <span className="font-medium">Business Name:</span>{" "}
          {equipment.ownerBusinessName || "Verified Owner"}
        </div>

        {/* ===== PRICE + STATUS ===== */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-green-700 font-bold">
            ₹ {equipment.rentPerDay} / day
          </div>

          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
            Available
          </span>
        </div>

        {/* ===== ACTION ===== */}
        <button
          onClick={() => setOpen(true)}
          className="
            mt-auto bg-green-600 text-white py-2 rounded-lg
            font-semibold hover:bg-green-700 transition
          "
        >
          Request Rental
        </button>
      </div>

      {/* ===== MODAL ===== */}
      {open && (
        <RentalRequestModal
          equipment={equipment}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
