import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEquipment } from "../../services/equipmentService";

export default function AddEquipment() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    rentPerDay: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEquipment({
        ...form,
        rentPerDay: Number(form.rentPerDay)
      });
      navigate("/owner/equipments");
    } catch (err) {
      console.error("Failed to add equipment", err);
    }
  };

  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-4">Add New Equipment</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          name="name"
          placeholder="Equipment Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="category"
          placeholder="Category (Tractor, Harvester...)"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="rentPerDay"
          type="number"
          placeholder="Rent per day"
          value={form.rentPerDay}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
