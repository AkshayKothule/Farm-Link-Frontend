import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

import FarmerLayout from "./pages/farmer/FarmerLayout";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import BrowseEquipments from "./pages/farmer/BrowseEquipments";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import MyRentals from "./pages/farmer/MyRentals";
import PaymentHistory from "./pages/farmer/PaymentHistory";
import Settings from "./pages/farmer/Settings.jsx"

import OwnerDashboard from "./pages/owner/OwnerDashboard";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const isFarmer =
    isAuthenticated && (role === "FARMER" || role === "ROLE_FARMER");

  const isOwner =
    isAuthenticated && (role === "OWNER" || role === "ROLE_OWNER");

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/farmer"
        element={isFarmer ? <FarmerLayout /> : <Navigate to="/auth" />}
      >
        <Route index element={<FarmerDashboard />} />
        <Route path="equipments" element={<BrowseEquipments />} />
        <Route path="profile" element={<FarmerProfile />} />
        <Route path="rentals" element={<MyRentals />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* OWNER */}
      <Route
        path="/owner/dashboard"
        element={isOwner ? <OwnerDashboard /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}

export default App;
