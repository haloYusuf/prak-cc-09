import React from "react";
import { Outlet } from "react-router-dom"; // <-- Import Outlet
import Sidebar from "./Sidebar"; // <-- Import Sidebar

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar akan selalu ada di layout ini */}
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          <Outlet /> {/* <-- Di sinilah halaman anak akan dirender */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
