import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

import FarmerLayout from "./pages/farmer/FarmerLayout";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import BrowseEquipments from "./pages/farmer/BrowseEquipments";
import FarmerProfile from "./pages/farmer/FarmerProfile";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerLayout  from "./pages/owner/OwnerLayout"
import MyEquipments from "./pages/owner/MyEquipments"
import OwnerProfile from "./pages/owner/OwnerProfile"
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

      {/* FARMER */}
      <Route
        path="/farmer"
        element={isFarmer ? <FarmerLayout /> : <Navigate to="/auth" />}
      >
        <Route index element={<FarmerDashboard />} />
        <Route path="equipments" element={<BrowseEquipments />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      {/* OWNER */}
      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="equipments" element={<MyEquipments />} />
        <Route path="profile" element={<OwnerProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
