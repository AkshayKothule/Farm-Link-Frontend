import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "FARMER",
    addressDto: {
      addressLine: "",
      village: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // address fields
    if (name in form.addressDto) {
      setForm({
        ...form,
        addressDto: {
          ...form.addressDto,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      alert("Registration successful! Please login.");
      navigate("/auth");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed. Please check details."
      );
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">

      {/* ===== BASIC DETAILS ===== */}
      <div className="flex gap-3">
        <input
          name="firstName"
          placeholder="First Name"
          required
          onChange={handleChange}
          className="w-1/2 border px-4 py-2 rounded-lg"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          onChange={handleChange}
          className="w-1/2 border px-4 py-2 rounded-lg"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <select
        name="role"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      >
        <option value="FARMER">Farmer</option>
        <option value="OWNER">Equipment Owner</option>
      </select>

      {/* ===== ADDRESS DETAILS ===== */}
      <h3 className="font-semibold text-gray-600 pt-4">
        Address Details
      </h3>

      <input
        name="addressLine"
        placeholder="Address Line"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="village"
        placeholder="Village"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="taluka"
        placeholder="Taluka"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="district"
        placeholder="District"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="state"
        placeholder="State"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="pincode"
        placeholder="Pincode"
        required
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
      />

      {/* ===== SUBMIT ===== */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
}
