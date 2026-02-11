import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import WavyFooter from "./WavyFooter";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background max-w-md mx-auto relative shadow-lg">
      <AppHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <WavyFooter />
    </div>
  );
};

export default AppLayout;
