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
import Post from "../pages/Post";
// import App from "../App";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/post" element={<Post />} />
        </Route>
      </Route>

      <Route path="/x-clone" element={<Navigate to="/login" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
