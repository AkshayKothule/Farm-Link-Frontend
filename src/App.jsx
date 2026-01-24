import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* 🔐 FARMER DASHBOARD */}
      <Route
        path="/farmer/dashboard"
        element={
          isAuthenticated &&
          (role === "FARMER" || role === "ROLE_FARMER") ? (
            <FarmerDashboard />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* 🔐 OWNER DASHBOARD */}
      <Route
        path="/owner/dashboard"
        element={
          isAuthenticated &&
          (role === "OWNER" || role === "ROLE_OWNER") ? (
            <OwnerDashboard />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
