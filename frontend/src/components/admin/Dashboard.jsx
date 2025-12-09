import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authstate";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignoutMutation } from "../../redux/features/authSlice.Api";

export const Dashboard = () => {
  const { email, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();
  useEffect(() => {
    if (!isAuth) {
      navigate("/notfound");
    }
  }, [isAuth]);
  const handleLogout = async () => {
    dispatch(logout());
    try {
      const res = await signout().unwrap();
      toast.success(res.message || "Logged Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };
  return (
    <div className="h-screen flex">
      <div className="bg-blue-950 pt-3">
        <Link
          to="/dashboard/teacher"
          className="text-white text-xl p-1 bg-amber-200 m-2 rounded-md"
        >
          {" "}
          Add Teacher
        </Link>
      </div>
      <div className="flex flex-col mx-auto justify-center">
        <div>
          <h1 className="font-bold text-3xl   mx-auto">
            Hello Admin Nabin Bhusal
          </h1>
        </div>

        <div className="  flex flex-col mx-auto justify-center">
          <p className="text-xl">Welcome:{ email}</p>

          <button
            onClick={handleLogout}
            className=" mt-4 text-4xl text-red-700 "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
