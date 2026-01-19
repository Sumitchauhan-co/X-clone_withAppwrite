import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/x-clone/login" replace />;
};

export default PrivateRoutes;