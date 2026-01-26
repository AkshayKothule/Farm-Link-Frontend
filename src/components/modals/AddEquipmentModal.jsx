import { useState } from "react";
import api from "../../services/api";
import { errorToast, successToast } from "../../utils/toast";

export default function AddEquipmentModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    rentPerDay: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      errorToast("Maximum 5 images allowed");
      return;
    }

    setImages(files);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.rentPerDay) {
      errorToast("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      // 🔹 DTO as JSON blob
      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              ...form,
              rentPerDay: Number(form.rentPerDay),
            }),
          ],
          { type: "application/json" }
        )
      );

      // 🔹 Optional images
      images.forEach((img) => {
        formData.append("images", img);
      });

      await api.post("/owners/equipments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      successToast("🚜 Equipment added successfully");
      onSuccess();
      onClose();

    } catch (err) {
      errorToast(
        err.response?.data?.message || "Failed to add equipment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

          <h2 className="text-xl font-bold mb-4">
            Add New Equipment 🚜
          </h2>

          <div className="space-y-3">
            <input
              name="name"
              placeholder="Equipment Name"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              name="category"
              placeholder="Category"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              name="rentPerDay"
              type="number"
              placeholder="Rent per day"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Description (optional)"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />

            {/* 📸 IMAGES (OPTIONAL) */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm"
            />

            {images.length > 0 && (
              <p className="text-xs text-gray-500">
                {images.length} image(s) selected
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="w-1/2 border rounded-lg py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-1/2 bg-green-700 text-white rounded-lg py-2"
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
