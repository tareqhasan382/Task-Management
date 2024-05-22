"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoaderModal from "../LoaderModal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import useCardStore from "@/store/useCardStore";
import Select from "react-select";
import useUserStore from "@/store/useUserStore";

const CreateCard = ({ isOpen, onClose, list }) => {
  const { data: session } = useSession();
  const { createCardList, fetchCardList } = useCardStore();
  const { users, fetchUsers } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  useEffect(() => {
    setAllUser(users.map((user) => ({ value: user._id, label: user.name })));
  }, [users]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    date: yup.date().required(),
    listId: yup.string().required(),
    order: yup.number().required(),
    teamMembers: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      )
      .required("At least one team member must be selected")
      .min(1, "At least one option must be selected"),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const teamMembers = data.teamMembers.map((tag) => tag.value);
    //title , description , subtaskDate , listId , teamMembers
    const formData = {
      title: data.title,
      description: data.description,
      subtaskDate: data.date,
      order: list.order,
      listId: data.listId,
      teamMembers: teamMembers,
      bordId: list?.bordId,
    };

    try {
      setLoading(true);
      //   console.log("data:", formData);
      await createCardList(formData);
      await fetchCardList(list.bordId);
      setLoading(false);
      toast.success("TaskList created successfully");
      onClose();
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Error Task list creation failed");
    }
  };

  if (loading) {
    return <LoaderModal show={loading} />;
  }
  if (!isOpen) {
    return null;
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg z-50 w-full max-w-md mx-2 md:mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Create Task Card</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="w-full flex flex-col mb-4">
                <input
                  hidden
                  type="text"
                  id="listId"
                  {...register("listId")}
                  defaultValue={list?._id}
                />
                <input
                  hidden
                  type="order"
                  id="order"
                  {...register("order")}
                  defaultValue={list?.order}
                />

                <label>Card Title</label>
                <input
                  className="mb-2 p-2 border-gray-300 border-[1px] rounded-lg outline-none focus:border-gray-600 text-black"
                  type="text"
                  id="title"
                  placeholder="Enter card title"
                  {...register("title")}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">
                    {errors.title.message}
                  </span>
                )}
                <label>Card Description</label>
                <textarea
                  aria-multiline
                  className="p-2 mb-2 h-24 border-gray-300 border-[1px] rounded-lg outline-none focus:border-gray-600 text-black"
                  type="text"
                  id="description"
                  placeholder="Write card description"
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-sm text-red-500">
                    {errors.description.message}
                  </span>
                )}
                <label>Due Date</label>
                <input
                  type="date"
                  name="date"
                  {...register("date")}
                  // value={selectDate}
                  // onChange={(e) =>
                  //   setSelectDate(
                  //     format(parseISO(e.target.value), "yyyy-MM-dd")
                  //   )
                  // }
                  className="mb-2 p-2 border-gray-300 border-[1px] rounded-lg outline-none focus:border-gray-600 text-black"
                />
                <label>Select Team Members</label>
                <Controller
                  name="teamMembers"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={allUser}
                      isMulti
                      className="mb-2"
                      placeholder="Select team members"
                      onChange={(selected) => field.onChange(selected)}
                      value={field.value}
                    />
                  )}
                />
                {errors.teamMembers && (
                  <span className="text-sm text-red-500">
                    {errors.teamMembers.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col">
                <button
                  disabled={loading}
                  type="submit"
                  className="text-xl font-bold p-2 rounded-lg bg-blue-600 hover:bg-blue-700 duration-700 text-white mt-2"
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

export default CreateCard;
