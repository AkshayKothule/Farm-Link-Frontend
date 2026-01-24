import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
