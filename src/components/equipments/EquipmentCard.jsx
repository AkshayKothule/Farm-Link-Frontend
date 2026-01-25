export default function EquipmentCard({
  equipment,
  isOwner,
  onDelete,
  onToggleAvailability
}) {
  return (
    <div className="bg-white p-4 rounded shadow">

      <img
        src={equipment.imageUrl}
        alt={equipment.name}
        className="h-40 w-full object-cover rounded mb-3"
      />

      <h3 className="font-semibold">{equipment.name}</h3>
      <p className="text-sm text-gray-500">
        {equipment.category}
      </p>

      <p className="mt-1">
        ₹ {equipment.rentPerDay} / day
      </p>

      {isOwner && (
        <>
          <p className="mt-2 text-sm">
            Status:{" "}
            <b className={equipment.available ? "text-green-600" : "text-red-600"}>
              {equipment.available ? "Available" : "Unavailable"}
            </b>
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={onToggleAvailability}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
            >
              Toggle Availability
            </button>

            <button
              onClick={onDelete}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
