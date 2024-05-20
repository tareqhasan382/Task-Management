"use client";
import React, { useState, useRef } from "react";
import { UserCircle, MessageCircle, CheckCircle } from "lucide-react";
import UserModal from "./UserModal";

const TaskCard = ({ task }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  const handleUserClick = (user, event) => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const userRect = event.target.getBoundingClientRect();
    setModalPosition({
      top: userRect.top - cardRect.top + userRect.height,
      left: userRect.left - cardRect.left,
    });
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div
      ref={cardRef}
      className="bg-white  w-full rounded-lg shadow p-4 mb-6  relative"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-red-600 text-xs font-semibold uppercase mr-2">
            High Priority
          </span>
        </div>
        <div className="text-gray-400">
          <MessageCircle size={20} />
        </div>
      </div>

      {/* buttom */}
      <h3 className="text-lg font-semibold my-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.date}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-600">
            <MessageCircle className="mr-1" size={16} />{" "}
            <span>{task.comments}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="mr-1" size={16} />{" "}
            <span>{task.subtasks}</span>
          </div>
        </div>

        <div
          className="inline-block cursor-pointer"
          // onClick={(event) => handleUserClick(event)}
          // key={index}
        >
          <span className="bg-gray-200 text-xs font-semibold rounded-full py-1 px-3">
            assignee
          </span>
        </div>

        {/* <div className="flex space-x-2">
          {task.assignees.map((assignee, index) => (
            <div
              className="inline-block cursor-pointer"
              onClick={(event) => handleUserClick(assignee, event)}
              key={index}
            >
              <span className="bg-gray-200 text-xs font-semibold rounded-full py-1 px-3">
                {assignee.initials}
              </span>
            </div>
          ))}
        </div> */}
      </div>
      <p className="text-gray-800 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{task.subtaskDate}</span>
        <span className="text-blue-600 text-sm font-semibold">{task.tag}</span>
      </div>
      <button className="mt-4 text-blue-600 text-sm font-semibold">
        Add Subtask
      </button>
      {selectedUser && (
        <UserModal
          user={selectedUser}
          position={modalPosition}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TaskCard;
