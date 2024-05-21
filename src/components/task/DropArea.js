"use client";
import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setShowDrop(true);
    console.log("Drag Enter");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setShowDrop(false);
    console.log("Drag Leave");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setShowDrop(false);
    console.log("Drop");
    onDrop();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        showDrop ? "block bg-black text-white opacity-100" : "hidden"
      } text-sm font-mono border border-dashed border-gray-300 p-4`}
    >
      Drop Here
    </div>
  );
};

export default DropArea;
