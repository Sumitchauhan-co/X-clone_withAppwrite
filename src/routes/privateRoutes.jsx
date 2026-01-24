import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading)
    return (
      <div className="min-h-screen w-full bg-black flex justify-center items-center">
          <div className="h-7 w-7 border-4 rounded-[50%] border-blue-950 border-t-blue-400 animate-spin"></div>
      </div>
    );

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/x-clone/login" replace />
  );
};

export default PrivateRoutes;
