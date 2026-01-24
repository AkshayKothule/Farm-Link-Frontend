function RentalCard({ rental }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h4 className="font-semibold">
          {rental.equipmentName}
        </h4>
        <p className="text-sm text-gray-500">
          {rental.startDate} → {rental.endDate}
        </p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          rental.status === "APPROVED"
            ? "bg-green-100 text-green-700"
            : rental.status === "REJECTED"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {rental.status}
      </span>
    </div>
  );
}

export default RentalCard;