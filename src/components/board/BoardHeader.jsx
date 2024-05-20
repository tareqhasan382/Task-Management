"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import CreateBoard from './CreateBoard';

const BoardHeader = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
 
  return (
    <div>
        <header className="w-full bg-white py-4 px-6 shadow-md flex justify-between items-center">
     <Link href="/">
     <div className="flex items-center">
        <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full mr-2"></div>
        <span className="text-2xl font-bold">TaskFlow</span>
      </div>
     </Link>
      <div className="flex items-center space-x-4">
        <button onClick={()=>setIsModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Create Board
        </button>
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
    <CreateBoard isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default BoardHeader