"use client";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoaderModal from "../LoaderModal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import useTaskListStore from "@/store/useTaskListStore";
const CreateTaskList = ({ isOpen, onClose, boardId }) => {
  const { data: session } = useSession();

  const { createTaskList, newOrder, fetchTaskList } = useTaskListStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      board: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const lastOrder = newOrder ? newOrder + 1 : 1;

    // if (!session?.user) {
    //   return router.push("/sign-in");
    // }
    try {
      const listData = {
        name: data?.name,
        bordId: data?.board,
        order: lastOrder,
      };

      setLoading(true);
      await createTaskList(listData);
      await fetchTaskList(boardId);
      setLoading(false);
      toast.success("TaskList created successfully");
      onClose();
      reset();
      // console.log("result:", result);
    } catch (error) {
      setLoading(false);

      toast.error("Error Task list created");
    }
  };
  if (loading) {
    return <LoaderModal show={loading} />;
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg z-50 w-80">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Create Task List</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="  ">
              <div className=" w-full flex flex-col mb-4">
                <input
                  hidden
                  type="board"
                  id="board"
                  {...register("board")}
                  defaultValue={boardId}
                />
                <label className=" mb-2 ">List Name</label>
                <input
                  className=" p-2 border-gray-300 border-[1px] rounded-lg  outline-none focus:border-gray-600 text-black  "
                  type="name"
                  id="name"
                  placeholder="enter your list name..."
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className=" text-sm text-red-500 ">
                    {errors?.name?.message}
                  </span>
                )}
              </div>
              <div className=" w-full flex flex-col ">
                <button
                  disabled={loading}
                  type="submit"
                  className=" text-xl font-bold p-2 rounded-lg bg-blue-600 hover:bg-blue-700 duration-700 text-white  mt-2  "
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskList;

//CreateTaskList
