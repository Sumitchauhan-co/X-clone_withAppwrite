import { Outlet } from "react-router-dom";
import Section1 from "../sections/Section1";
import Section3 from "../sections/Section3";

const AppLayout = () => {
  return (
    <div className="bg-black h-screen w-screen grid xl:grid-cols-[0.8fr_1.2fr_1fr] lg:grid-cols-[0.5fr_1.7fr_1fr] sm:grid-cols-[0.5fr_1.5fr]">
      <Section1 />
      <Outlet />
      <Section3 />
    </div>
  );
};

export default AppLayout;