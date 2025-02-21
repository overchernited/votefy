import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useContext";
import { ClipLoader } from "react-spinners";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white">
        <ClipLoader color="#1784ddd2" size={50} className="" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
