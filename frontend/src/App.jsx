
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer} from 'react-toastify';
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import { Dashboard } from "./components/admin/Dashboard";
import NOTFound from "./components/NOTFound";

const App = () => {
  return (
    <div>
        
       
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/notfound" element={<NOTFound/>}/>


      </Routes>
    
        
      </BrowserRouter>
      <ToastContainer />
   </div>
  );

};
export default App;