import React, { useState } from 'react'

const Navbar = () => {
    const [open,setOpen]=useState(false)
  return (
    <div>
        <div className=' w-full bg-red-400 flex flex-row justify-between px-4 py-4 items-center text-center '>
            <h1 className=' lg:text-4xl text-xl font-extrabold '>Dashboard</h1>
            <button onClick={()=>setOpen(true)} className=' bg-black text-white p-2 rounded '>Create Task</button>
            
        </div>
    </div>
  )
}

export default Navbar;