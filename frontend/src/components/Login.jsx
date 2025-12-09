import { useState } from "react";
import Input from "./shared/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authstate";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all filed");
      return;
    }
    try {
      const res = await fetch("http://localhost:404/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      toast.success(`${data.Message}`);
      dispatch(setUser(data?.user));
      if (res.status === 200) {
        navigate("/dashboard");
      }
      // console.log(data);
    } catch (error) {
      toast.error("Something Wrong", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handelSubmit} className="flex flex-col w-full gap-5">
          <label className="flex flex-col text-left">
            Email:
            <Input
              type="text"
              placeholder="Enter the email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col text-left">
            Password:
            <Input
              type="password"
              placeholder="Enter the password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
