"use client";
import { CircleChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useTaskListStore from "@/store/useTaskListStore";
import LoaderModal from "../LoaderModal";
import Section from "../task/Section";
import CreateTaskList from "../task/CreateTaskList";
import useCardStore from "@/store/useCardStore";

const Tasks = ({ boardId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { taskList, loading, fetchTaskList } = useTaskListStore();
  const { fetchCardList,updateCardList, moveTask ,dragTask ,setDragTask} = useCardStore();
  
  useEffect(() => {
    fetchTaskList(boardId);
    
  }, [fetchTaskList, boardId]);

  useEffect(() => {
    fetchCardList(boardId);
  }, [fetchCardList, boardId]);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
const handleDrop= async({id,order})=>{
moveTask(id, order);
setDragTask(null);
await updateCardList({ id: id, data: { order: order } })
// await fetchCardList(boardId);

}
  if (loading) {
    return <LoaderModal show={loading} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className=" lg:p-6 p-1 ">
        <div className="flex flex-row items-center text-center w-full mb-4 gap-4">
          <Link href="/board">
            <CircleChevronLeft size={30} className="hover:text-blue-400" />
          </Link>
          <h1 className="text-2xl font-bold">Board Name</h1>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {taskList.map((item) => (
            

            
            <div  
            key={item._id}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e)=>handleDrop({id:dragTask, order:item.order})}
            >
              <Section list={item}  />
          
            </div>
            
          ))}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white hover:bg-slate-50 p-2 shadow-lg rounded text-black flex items-center"
          >
            <Plus />
            <span className="font-semibold">Add a list</span>
          </button>
        </div>
        <CreateTaskList
          boardId={boardId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Tasks;

/*

onDrop={(e) => {
              updateCardList(dragTask, item.order);
            //  moveTask(dragTask, item.order);
              setDragTask(null);
              
            }}
*/