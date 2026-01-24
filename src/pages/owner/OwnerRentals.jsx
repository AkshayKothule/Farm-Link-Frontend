import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerRentals() {
  const [rentalsRaw, setRentalsRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await axios.get("/rentals/owner");
      setRentalsRaw(res.data);
    } catch (error) {
      console.error("Failed to fetch owner rentals", error);
      setRentalsRaw([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ always array
  const rentals = Array.isArray(rentalsRaw)
    ? rentalsRaw
    : Array.isArray(rentalsRaw?.data)
    ? rentalsRaw.data
    : [];

  const approveRental = async (id) => {
    await axios.put(`/rentals/owner/${id}/approve`);
    fetchRentals();
  };

  const rejectRental = async (id) => {
    await axios.put(`/rentals/owner/${id}/reject`);
    fetchRentals();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">Loading rental requests...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Rental Requests</h2>

      {rentals.length === 0 ? (
        <p className="text-gray-500">No rental requests</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">Farmer</th>
              <th>Equipment</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rentals.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.farmerName}</td>
                <td>{r.equipmentName}</td>
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>
                  <span
                    className={`font-semibold ${
                      r.status === "PENDING"
                        ? "text-orange-600"
                        : r.status === "APPROVED"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="space-x-2">
                  {r.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => approveRental(r.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRental(r.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
