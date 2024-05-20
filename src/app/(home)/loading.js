import React from "react";
const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen  items-center justify-center block "
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white w-full h-full flex items-center justify-center p-8 text-black rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        <p className="text-center text-4xl  ">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
