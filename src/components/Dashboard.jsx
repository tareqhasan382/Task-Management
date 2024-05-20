"use client";
import React, { useEffect, useState } from "react";
import Section from "./Section";
import { dataStore } from "@/store/dataStore";
import Modal from "./Modal";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CircleChevronLeft } from "lucide-react";
import useStore from "@/store/store";
import LoaderModal from "./LoaderModal";

const Dashboard = () => {
  const {setLoginStatus,isLoggedIn,loader}=useStore()
  const router= useRouter();
  const { data: session } = useSession();
 useEffect(()=>{
  if(session?.user){
  //  console.log(!!session.user)
setLoginStatus(!!session.user)
  }
 },[session,setLoginStatus])
  const [open, setOpen] = useState(false);
  const { searchQuery, setSearchQuery } = dataStore();
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className=" w-full h-auto mx-auto  lg:px-20 px-2 rounded  ">
      <LoaderModal show={loader} />
    <div className=" w-full bg-red-400 flex flex-row justify-between px-4 py-4 items-center text-center ">
      <h1 className=" lg:text-4xl text-xl font-extrabold ">Dashboard</h1>
      <button
        onClick={() => setOpen(true)}
        className=" bg-black text-white p-2 rounded "
      >
        Create Task
      </button>
      {isLoggedIn ? (
        <button
          onClick={() => signOut()}
          className=" bg-black text-white p-2 rounded "
        >
          Sign Out
        </button>
      ) : (
        <Link href="/sign-in">
          <button className=" bg-black text-white p-2 rounded ">
            Sign In
          </button>
        </Link>
      )}
    </div>
    <div className="w-full flex flex-row lg:gap-4 gap-2 my-2">
      {/* <button onClick={() => router.replace("/allTask") } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-0">
        All Task
      </button> */}
      <button onClick={()=>router.push("/allTask")} className=' flex flex-row gap-2 bg-black text-white p-2 rounded hover:bg-gray-800 '><CircleChevronLeft />All Task</button>
      <div className="relative flex items-center justify-center ">
        <input
          className="p-2 border-gray-300 border-[1px] rounded-lg w-full md:w-[300px] outline-none focus:border-gray-600 text-black"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FiSearch
          size={20}
          className="absolute right-3 top-3 text-gray-500 pointer-events-none"
        />
      </div>
    </div>

    {/* <div className=' w-full flex flex-row gap-4 items-center  '>
        <button>All Task</button>
          <div><input
            className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px]  outline-none focus:border-gray-600 text-black "
            type="text"
            id="search"
            name="search"
            
          /> <FiSearch size={20} />
          </div>
      </div> */}

    <Modal isOpen={open} onClose={() => setOpen(false)} />
    <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-5 h-full  ">
      <Section state="PLANED" name="To Do" />
      <Section state="ONGOING" name="Progress" />
      <Section state="DONE" name="Done" />
    </div>
  </div>
  );
};

export default Dashboard;
// {store.addTask({title:"Tareq",state:"DONE"})}
