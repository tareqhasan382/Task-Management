"use client";
import { Edit, Ellipsis, Eye, Move, Trash } from "lucide-react";
import React, { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import UpdateCard from "./UpdateCard";
import useTaskListStore from "@/store/useTaskListStore";
import LoaderModal from "../LoaderModal";
import useCardStore from "@/store/useCardStore";

const CardItem = ({ item }) => {
  const { taskList } = useTaskListStore();
  const { updateCardList, loading, fetchCardList, deleteCard } = useCardStore();
  const [showModal, setShowModal] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const userInfo = {
    name: "Jane Smith",
    role: "Product Manager",
    email: "jane.smith@example.com",
  };
  const toggleModal = () => {
    setShowModal(!showModal);
    setIsHovered(!isHovered);
  };
  const handleOrderMove = async (task) => {
    await updateCardList({ id: item._id, data: { order: task.order } });
    await fetchCardList(item.bordId);
  };
  const handleCardDelete = async () => {
    await deleteCard(item._id);
    await fetchCardList(item.bordId);
  };
  if (loading) {
    return <LoaderModal show={loading} />;
  }
  return (
    <div className=" p-2 ">
      <div className=" relative w-full items-center flex flex-row justify-between  ">
        <span className="text-red-600 text-xs font-semibold uppercase mr-2">
          High Priority
        </span>
        <button
          onClick={() => setIsHovered(!isHovered)}
          className="text-black size-8 flex items-center rounded-full hover:bg-gray-200 duration-300  "
        >
          <Ellipsis className="  w-full h-full p-1 " size={20} />
        </button>
        <div
          onClick={() => setIsHovered(true)}
          className={`absolute top-6  right-0 flex items-center  ${
            isHovered ? "" : "hidden"
          }`}
        >
          {isHovered && (
            <div className=" z-50 bg-white lg:px-3 md:px-1 py-1 w-full rounded shadow-lg text-black flex flex-col ">
              <button
                onClick={toggleModal}
                className=" p-1  w-full hover:bg-gray-300 rounded "
              >
                <small className=" flex text-center gap-3 items-center">
                  <Edit size={10} /> Edid
                </small>
              </button>
              <button
                onClick={handleCardDelete}
                className=" p-1 w-full hover:bg-gray-300 rounded "
              >
                <small className=" flex text-center gap-3 items-center">
                  <Trash size={10} /> Delete
                </small>
              </button>
              <button className=" p-1 w-full hover:bg-gray-300 rounded ">
                <small className=" flex text-center gap-3 items-center">
                  <Eye size={10} /> View
                </small>
              </button>
              <div
                onClick={() => setIsMove(!isMove)}
                className=" cursor-pointer  p-1 w-full hover:bg-gray-300 rounded "
              >
                <small className=" flex text-center gap-3 items-center">
                  <Move size={10} /> Move
                </small>
              </div>
            </div>
          )}
        </div>
        {isMove && (
          <div className=" absolute z-50 bg-gray-200 w-full py-1 rounded shadow-lg text-black flex flex-row ">
            {taskList &&
              taskList.map((task) => (
                <div
                  key={task._id}
                  className=" flex flex-row w-full justify-around gap-1 "
                >
                  <button
                    onClick={() => handleOrderMove(task)}
                    className={` rounded p-1  ${
                      task.order === item.order
                        ? " bg-black text-white "
                        : "bg-white"
                    }`}
                  >
                    {task?.name}
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="">
        <p className="text-sm font-semibold">{item.title}</p>
        <small>{item.description}</small>
      </div>
      <div className=" relative mt-2 flex items-center justify-between">
        <span className="bg-gray-200 text-xs font-semibold rounded-full py-1 px-3">
          assignee
        </span>
        <div className="  right-0  ">
          <button
            onClick={() => setShowUser(!showUser)}
            className="inline-block size-8 text-center items-center bg-slate-200 rounded-full cursor-pointer "
          >
            {/* <User className=" w-full h-full p-1 " /> */}
          </button>
          <div
            onClick={() => setShowUser(true)}
            className={`absolute top-6 right-0 flex items-center  `}
          >
            {showUser && (
              <div className=" w-full rounded shadow-lg text-black flex flex-col ">
                <div className="bg-white w-full rounded-lg shadow-lg p-2 inline-block ">
                  <div className="flex justify-between items-center border-b border-blue-500 ">
                    <h2 className="text-lg font-semibold">User Info</h2>
                  </div>
                  <div className=" w-full inline-block ">
                    <p className="text-sm font-medium">Name: {userInfo.name}</p>
                    <p className="text-sm font-medium">Role: {userInfo.role}</p>
                    <p className="text-sm font-medium">
                      Email: {userInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500"> {formatDate(item.createdAt)}</p>
      <small>{item._id}</small>
      <UpdateCard isOpen={showModal} onClose={toggleModal} card="" />
    </div>
  );
};

export default CardItem;
