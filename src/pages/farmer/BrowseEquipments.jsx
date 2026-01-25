import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/sidebar/Sidebar";
import EquipmentCard from "../../components/equipments/EquipmentCard";

export default function BrowseEquipments() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/farmers/equipments/available")
      .then(res => {
        console.log(res.data);
        setEquipments(res.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex bg-green-50">


      {/* MAIN */}
      <main className="flex-1 p-6 sm:p-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900">
            Browse Equipment 🚜
          </h1>
          <p className="text-gray-600 mt-1">
            Choose the right equipment for your farming needs
          </p>
        </div>

        {loading ? (
          <div className="text-green-700 font-semibold">
            Loading equipments...
          </div>
        ) : equipments.length === 0 ? (
          <p className="text-gray-500">
            No equipment available at the moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipments.map(eq => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
