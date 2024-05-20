"use client"
import { dataStore } from "@/store/dataStore";
import classNames from "classnames";
import React, { useState } from "react";
import EditForm from "./EditForm";
import Details from "./Details";
//const STATUS = "DONE"; // ONGOING || DONE || PLANED
const Task = ({ id }) => {
  const [open,setOpen]=useState(false)
  const [details,setDetails]=useState(false)
    const tasks = dataStore((store)=>store.tasks.find((task)=>task.id===id))
     
    const store = dataStore();
  return (
    <div className=" bg-white text-black p-2 rounded opacity-100 cursor-move " draggable onDragStart={()=>{store.setDragTask(tasks.id)}} >
      <div className="w-full font-bold  ">{tasks.title}</div>
      {/* <div
                    className="ProseMirror whitespace-pre-line px-6 py-4"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <div
                      className=" ProseMirror whitespace-pre-line  px-6 py-4"
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{
                        __html: tasks?.content?.substring(0, 50),
                      }}
                    />
                  </div> */}
      <div className=" px-2 ">
        <div></div>
        <div className=" flex text-right items-end justify-end mt-1 gap-2 ">
            <div><button onClick={()=>setDetails(true)}   className=" bg-black text-white px-2 py-1 rounded ">Details</button></div>
            <div><button onClick={()=>setOpen(true)}   className=" bg-black text-white px-2 py-1 rounded ">Edit</button></div>
            <div><button onClick={()=>store.deleteTask(tasks.id)}  className=" bg-black text-white px-2 py-1 rounded ">Delete</button></div>
        <div className={classNames("status",tasks.state)}>{tasks.state}</div>
        </div>
        <EditForm isOpen={open} onClose={() => setOpen(false)} task={tasks} />
        <Details isOpen={details} onClose={() => setDetails(false)} task={tasks} />
      </div>
    </div>
  );
};

export default Task;
