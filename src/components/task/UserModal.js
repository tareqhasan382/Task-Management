import React from "react";

const UserModal = ({ isOpen, onClose, userInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg lg:w-1/3 mx-4 w-full p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">User Info</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Name: {userInfo.name}</p>
          <p className="text-sm font-medium">Role: {userInfo.role}</p>
          <p className="text-sm font-medium">Email: {userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
