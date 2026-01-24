import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Notification from "../pages/Notification";
import Follow from "../pages/Follow";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./privateRoutes";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";
// import App from "../App";

const AppRoutes = () => {
  return (

    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/x-clone/login" element={<Login />} />
        <Route path="/x-clone/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/x-clone/home" element={<Home />} />
          <Route path="/x-clone/explore" element={<Explore />} />
          <Route path="/x-clone/notification" element={<Notification />} />
          <Route path="/x-clone/follow" element={<Follow />} />
        </Route>
      </Route>

      <Route path="/x-clone" element={<Navigate to="/x-clone/login" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;