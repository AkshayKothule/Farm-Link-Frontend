import { useState } from "react";
import RentalRequestModal from "../modals/RentalRequestModal";

export default function EquipmentCard({ equipment }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          bg-white rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1
          transition-all duration-300
          p-5 flex flex-col
        "
      >
        {/* IMAGE */}
        <img
          src={equipment.imageUrl || "/placeholder-equipment.jpg"}
          alt={equipment.name}
          className="h-40 w-full object-cover rounded-xl mb-4"
        />

        {/* DETAILS */}
        <h3 className="text-lg font-semibold text-green-900">
          {equipment.name}
        </h3>

        <p className="text-sm text-gray-500">
          Category: {equipment.category}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {equipment.description || "No description available"}
        </p>

        <div className="mt-3 font-semibold text-green-700">
          ₹ {equipment.rentPerDay} / day
        </div>

        {/* ACTION */}
        <button
          disabled={equipment.available === false}
          onClick={() => !open && setOpen(true)}
          className={`
            mt-auto py-2 rounded-lg font-semibold transition
            ${
              equipment.available === false
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }
          `}
        >
          {equipment.available === false
            ? "Not Available"
            : "Request Rental"}
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <RentalRequestModal
          equipment={equipment}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
