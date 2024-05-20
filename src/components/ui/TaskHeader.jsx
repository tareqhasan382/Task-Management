"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const TaskHeader = () => {
  const {data} = useSession()
  return (
    <div>
        <header className="w-full bg-white py-4 px-6 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full mr-2"></div>
        <span className="text-2xl font-bold">TaskFlow</span>
      </div>
      <div className="flex items-center space-x-4">
        {data?.user ? <button onClick={()=>signOut()} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Sign Out
        </button>:<Link href="/sign-in"><button  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Sign In
        </button></Link> }
        <div className='hidden sm:block '>
        <div className=" flex items-center space-x-2">
          <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <span>Lorem Inc.</span>
        </div>
        </div>
        
      </div>
    </header>
    </div>
  )
}

export default TaskHeader