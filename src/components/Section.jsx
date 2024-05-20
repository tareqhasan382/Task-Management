"use client"
import React from 'react'
import Task from './Task';
import { dataStore } from '@/store/dataStore';
const Section = ({state,name}) => {
  const store=dataStore();
  const {searchQuery}=dataStore();
  const tasks = dataStore((store) =>
  store.tasks.filter((task) =>
    task.state === state &&
    task?.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
);

  return (
    <div className=' bg-gray-200  rounded mt-2 ' onDragOver={(e)=>{e.preventDefault()}}
     onDrop={(e)=>{ store.moveTask(store.dragTask,state);store.setDragTask(null) }} >
        
       <div className=' bg-gray-200 rounded '>
       <div className=' bg-black text-white text-center mb-2 text-2xl font-extrabold py-2 '>{name}</div>
       <div className=' text-black flex flex-col gap-2 p-2  '>
       {tasks?.map(task=><Task id={task.id} key={task.id} />)}
       </div>
       </div>
    </div>
  )
}

export default Section;