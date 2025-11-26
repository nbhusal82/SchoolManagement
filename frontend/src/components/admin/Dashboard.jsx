import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/features/authstate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 

export const Dashboard = () => {
  const {email,isAuth} =useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=> {
    if(!isAuth){
      navigate("/notfound");
    }
  },[isAuth]);
  const handleLogout=()=>{
    dispatch(logout());
  };
  return ( 
    <div className='h-screen flex justify-center'>
        <h1 className='font-bold text-3xl'>Hello  Admin Nabin Bhusal</h1>
        <p className="mt-5 text-5xl" >Welcome:{email}</p>
        
<button onClick={handleLogout} className= "text-4xl text-red-700 ">
          Logout
        </button>
    </div>
  )
}
