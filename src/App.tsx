import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <>
      <Routes>
        {/* <Route element={<ProtectedRoute redirectTo="/dashboard" />}> */}
        <Route element={<PublicRoute />}>
          <Route path="/admin" element={<AdminLogin />} />
        </Route>
        {/* </Route> */}
        <Route element={<ProtectedRoute redirectTo="/admin" />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
