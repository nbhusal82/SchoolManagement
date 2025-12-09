import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/admin/Dashboard";
import NOTFound from "./components/NOTFound";
import Teacherdash from "./components/admin/teacher/Teacherdash";




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notfound" element={<NOTFound />} />
          <Route path="/dashboard/teacher" element={<Teacherdash />}   />      
          <Route path="*" element={<NOTFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};
export default App;
