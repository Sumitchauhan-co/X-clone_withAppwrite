// Review ⛏️⚙️

import { useDispatch } from "react-redux";
import { logoutUser } from "./authThunks";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <button onClick={handleLogout}>Logout</button>;
};
