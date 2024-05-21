"use client";
import { ExternalLink, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import LoaderModal from "../LoaderModal";
import { formatDate } from "@/utils/formatDate";
import useBoardStore from "@/store/useBoardStore";
import { toast } from "react-toastify";

const Boards = () => {
  const { boards, loading, fetchBoards, deleteBoard } = useBoardStore();

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleDelete = async (boardId) => {
    try {
      await deleteBoard(boardId);
     
      toast.success("Board deleted successfully");
    } catch (error) {
      toast.error("Failed to delete board");
    }
  };
  if (loading) {
    return <LoaderModal show={loading} />;
  }
  console.log("Boards")
  return (
    <div className=" p-6 bg-slate-100 w-full min-h-screen ">
      <h1 className="text-2xl font-bold mb-4 text-left  ">My Board</h1>
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 h-auto gap-5  ">
        {
          !loading && boards.length > 0 ?
          boards.map((item) => (
            <div key={item?._id}>
              <div className="bg-white flex justify-between p-4 rounded-lg shadow-md ">
                <div className=" w-full ">
                  <div className=" w-full flex flex-row justify-between items-center mb-4  ">
                    <h2 className="text-lg font-bold ">{item?.name} </h2>
                    <div className="flex space-x-2 items-center ">
                      <Link href={`/tasks/${item?._id}`}>
                        <ExternalLink className="hover:text-blue-400" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2Icon size={24} />
                      </button>
                    </div>
                  </div>
                  <small>
                    createdAt: {item?.createdAt && formatDate(item?.createdAt)}
                  </small>
                </div>
              </div>
            </div>
          )) :<div><h1>Your Board is Empty!</h1></div>}
         
      </div>
    </div>
  );
};

export default Boards;
