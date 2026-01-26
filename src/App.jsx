import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

import FarmerLayout from "./pages/farmer/FarmerLayout";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import BrowseEquipments from "./pages/farmer/BrowseEquipments";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import MyRentals from "./pages/owner/OwnerRentals.jsx";
import PaymentHistory from "./pages/farmer/PaymentHistory";
import Settings from "./pages/farmer/Settings.jsx";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerLayout from "./pages/owner/OwnerLayout";
import MyEquipments from "./pages/owner/MyEquipments";
import OwnerProfile from "./pages/owner/OwnerProfile";
import OwnerRentals from "./pages/owner/OwnerRentals.jsx";
import OwnerPayments from "./pages/owner/OwnerPayments.jsx";
import ResetPassword from "./pages/ResetPassword";
import OwnerSettings from "./pages/owner/OwnerSettings.jsx";
import { ToastContainer } from "react-toastify";
// path तुझ्या project structure नुसार adjust कर

// import OwnerPayments from "./pages/owner/"
function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const isFarmer =
    isAuthenticated && (role === "FARMER" || role === "ROLE_FARMER");

  const isOwner =
    isAuthenticated && (role === "OWNER" || role === "ROLE_OWNER");

  return (
    <>
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

        {/* 🏭 OWNER */}
        <Route
          path="/owner"
          element={isOwner ? <OwnerLayout /> : <Navigate to="/auth" />}
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="equipments" element={<MyEquipments />} />
          <Route path="rentals" element={<OwnerRentals />} />
          <Route path="payments" element={<OwnerPayments />} />
          <Route path="profile" element={<OwnerProfile />} />
          <Route path="settings" element={<OwnerSettings />} />
        </Route>

        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      {/* 🌈 GLOBAL TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
        theme="light"
        toastStyle={{
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 500,
        }}
        bodyStyle={{
          padding: "8px 4px",
        }}
        progressStyle={{
          background: "linear-gradient(to right, #16a34a, #22c55e)",
        }}
      />
    </>
  );
}

export default App;
