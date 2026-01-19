import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { restoreSession } from "./features/auth/authThunk";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <AppRoutes/>
}

export default App;
