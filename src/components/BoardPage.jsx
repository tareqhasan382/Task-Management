"use client";
import useStore from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import LoaderModal from "./LoaderModal";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
const BoardPage = () => {
  const router=useRouter();
  const { data: session } = useSession();
  const { setLoginStatus, loader, isLoggedIn } = useStore();
  useEffect(() => {
    if (session?.user) {
      setLoginStatus(!!session.user);
    }
 
  }, [session, setLoginStatus]);
  if(loader){
    return <LoaderModal show={loader} />
   }
  return (
    <div className=" w-full h-auto mx-auto overflow-hidden bg-black text-white ">
      
      <div className=" bg-rose-600  w-full h-auto mx-auto py-4 lg:px-20 px-2 rounded flex flex-row items-center justify-between ">
        <h1 className=" lg:text-4xl text-xl font-extrabold ">Dashboard</h1>
        <div className=" flex flex-row items-center gap-2 ">
          <button
            // onClick={() => setOpen(true)}
            className=" bg-black text-white p-2 rounded flex text-right items-end justify-end "
          >
            Create Board
          </button>
          {!loader && isLoggedIn ? (
            <button
            onClick={() => signOut()}
              className=" bg-black text-white p-2 rounded flex text-right items-end justify-end "
            >
              <LogOut /> Logout
            </button>
          ) : (
            <button
            onClick={()=>router.push("/sign-in")}
              className=" bg-black text-white p-2 rounded flex text-right items-end justify-end "
            >
              <LogIn /> Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
