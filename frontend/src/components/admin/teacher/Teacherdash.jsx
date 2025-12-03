import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useAddteacherMutation,
  useDeleteTeacherMutation,
  useGetAllTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/teacherApi";
import { Loading } from "../../shared/loading";
import { Error } from "../../shared/Error";
const initialdata = {
  name: "",
  email: "",
  position: "",
  phone: "",
};

const Teacherdash = () => {
  const { data, isLoading, error } = useGetAllTeacherQuery();

  const teachers = data?.data;
  const [teacherId, setTeacherId] = useState();
  const [isMoalOpen, setIsModalOpen] = useState(false);
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [isAdding, setIsAdding] = useState(false);
  const [originalTeacher, setOriginalData] = useState({});
  const [formData, setFormData] = useState(initialdata);
  const [addteacher] = useAddteacherMutation();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEdit = (teacher) => {
    // setSelectedTeacher(teacher);
    setIsAdding(false);
    setTeacherId(teacher.id);
    setOriginalData(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      position: teacher.position,
      phone: teacher.phone,
    });
    setIsModalOpen(true);
  };
  const Handledelete = async (teacher) => {
    setTeacherId(teacher.id);
    // console.log(teacher.id);
    // toast.error("hey");
    try {
      await deleteTeacher(teacherId).unwrap(); // for use state
      //await deleteTeacher(teacher.id).unwrap(); // for  direct api call.
      toast.success("teacher deleted succesfully");
    } catch (error) {
      toast.error("failed to delete teacher");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdding) {
      // Adding a new teacher
      try {
        const res = await addteacher(formData).unwrap();
        toast.success(res.message || "Teacher added successfully");
        setIsModalOpen(false);
        setFormData(initialdata);
      } catch (error) {
        toast.error(error.data?.message || "Failded to add");
      }
      return; 
    }
    // Find only changed fields
    const changes = {};
    for (const key in formData) {
      if (formData[key] !== originalTeacher[key]) {
        changes[key] = formData[key];
      }
    }

    // If no changes, stop here
    if (Object.keys(changes).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      const res = await updateTeacher({
        id: teacherId,
        data: changes,
      }).unwrap();
      console.log(res);
      toast.success(res.message || "Teacher updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update teacher");
    }
  };

  const handleteacher = () => {
    setIsModalOpen(true);
    setIsAdding(true);
    setTeacherId(null);
    setOriginalData({});
    setFormData(initialdata);
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  if (error) {
    return <Error Error={Error} />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Teachers List</h1>
        <button
          onClick={handleteacher}
          className=" mb-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Add Teacher
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {teacher.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-blue-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="space-x-3">
                    <button
                      className=" bg-red-500 m-2 rounded-md cursor-pointer underline font-bold"
                      onClick={() => Handledelete(teacher)}
                    >
                      Delete
                    </button>
                    <button
                      className=" bg-green-600 m-2 rounded-md cursor-pointer underline"
                      onClick={() => handleEdit(teacher)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {teachers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No teacher data found</p>
        )}
      </div>
      {isMoalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "Add" : "Edit"} Teacher
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                value={formData?.name || ""}
                type="text"
                id="name"
                placeholder="Name"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.email || ""}
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.position || ""}
                type="text"
                id="position"
                placeholder="Position"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <input
                value={formData?.phone || ""}
                type="text"
                id="phone"
                placeholder="Phone"
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className=" cursor-pointer px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isAdding ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacherdash;
