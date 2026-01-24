import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔐 Later backend + JWT logic
    navigate("/farmer/dashboard");
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Login
      </button>
    </div>
  );
}
