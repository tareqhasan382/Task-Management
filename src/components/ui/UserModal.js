import { X } from "lucide-react";
import React from "react";

const UserModal = ({ user, position, onClose }) => {
  if (!user) return null;
  // left: position.left  style={{ top: position.top, }} p-4
  return (
    <div
      className="absolute outline outline-2 outline-slate-400 bg-white p-2 rounded-lg shadow-lg w-auto z-50"
      style={{ top: position.top, right: 0 }}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        <X />
      </button>
      <div className="flex items-center">
        <div className=" size-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
          {user.initials}
        </div>
        <div className="ml-2 ">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.role}</p>
          <p className="text-blue-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
