import React from "react";
import { indexSlice } from "./indexSlice";

export const teacherApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Teachers
    // query:get,post,update,delete (moutation)
    getAllTeacher: builder.query({
      query: () => ({
        url: "/teacher/get-teacher",
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),
    //ADD teacher
    addteacher: builder.mutation({
      query: (data) => ({
        url: "teacher/add-teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});
export const {
  useGetAllTeacherQuery,
  useAddteacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherApi;
