import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EquipmentCard from "../../components/equipments/EquipmentCard";
import {
  getMyEquipments,
  deleteEquipment,
  updateEquipment
} from "../../services/equipmentService";

export default function MyEquipments() {

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    try {
      const res = await getMyEquipments();
      setEquipments(res.data);
    } catch (err) {
      console.error("Failed to load equipments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this equipment?"))
      return;

    await deleteEquipment(id);
    loadEquipments();
  };

  const handleToggleAvailability = async (equipment) => {
    await updateEquipment(equipment.id, {
      available: !equipment.available
    });
    loadEquipments();
  };

  return (
    <div>

      {/* HEADER + ADD BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Equipments</h1>
          <p className="text-gray-500">
            Manage your listed equipments
          </p>
        </div>

        <Link
          to="/owner/equipments/add"
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          + Add Equipment
        </Link>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : equipments.length === 0 ? (
        <p className="text-gray-500">
          You haven’t added any equipments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {equipments.map(eq => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              isOwner={true}
              onDelete={() => handleDelete(eq.id)}
              onToggleAvailability={() =>
                handleToggleAvailability(eq)
              }
            />
          ))}
        </div>
      )}

    </div>
  );
}
