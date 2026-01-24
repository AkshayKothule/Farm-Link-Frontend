import OwnerLayout from "./OwnerLayout";
import OwnerStats from "./OwnerStats";
import OwnerRentals from "./OwnerRentals";

export default function OwnerDashboard() {
  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold text-green-900">
        Owner Dashboard
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your equipments and rental requests
      </p>

      <OwnerStats />
      <OwnerRentals />
    </OwnerLayout>
  );
}
