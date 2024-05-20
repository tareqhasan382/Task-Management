"use client"
import { dataStore } from '@/store/dataStore';
import React, { useEffect, useState } from 'react'
import EditForm from './EditForm';
import classNames from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { SlidersHorizontal } from 'lucide-react';
import FilterModal from './FilterModal';
import {  useRouter } from 'next/navigation';
import { CircleChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Details from './Details';
import LoaderModal from './LoaderModal';
import useStore from '@/store/store';


const AllTasks = () => {
 const { data: session } = useSession();
  // if (!session?.user) redirect("/sign-in");
  const {setLoginStatus,loader}=useStore();
  const router=useRouter()
    const store = dataStore();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [details,setDetails]=useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date,setDate]=useState('')
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(()=>{
      if(session?.user){
      //  console.log(!!session.user)
    setLoginStatus(!!session.user)
      }
     },[session,setLoginStatus])
    useEffect(() => {
      setFilteredTasks(store.tasks);
    }, [store.tasks,selectedOption]);
    const handleModalToggle = () => {
      setIsModalOpen(!isModalOpen);
    };
    const [open,setOpen]=useState(false)
    const { searchQuery, setSearchQuery } = dataStore();
    
     const handleSearchChange = (e) => {
      setSearchQuery(e.target.value) ;
      filterData({ date, selectedOption, searchQuery: e.target.value });
    };
   
    const filterData = ({ date, selectedOption, searchQuery }) => {
      let filteredData = store.tasks;
  
      if (date) {
        filteredData = filteredData.filter(task => task.dueDate === date);
      }
  
      if (selectedOption) {
        filteredData = filteredData.filter(task => task.state === selectedOption);
      }
  
      if (searchQuery) {
        filteredData = filteredData.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
  
      setFilteredTasks(filteredData);
    };
    if(loader){
     return <LoaderModal show={loader} />
    }
 
  return (
   <div>
  
    <div className=' w-full '>
      
      <div className=" w-full bg-red-400 flex flex-row justify-between px-4 py-4 items-center text-center ">
        <div className="w-full flex flex-row lg:gap-4 gap-2 my-2 items-center ">
          <h1 className=" lg:text-4xl text-xl font-extrabold inline-block lg:w-44 w-24 ">All Tasks</h1>
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
          {/* <h1 className=" lg:text-4xl text-xl font-extrabold ">Board</h1> */}
        </div>
      </div>
      <div className=' flex flex-row gap-2 '><div className=' pl-4 pt-4 '>
      <button onClick={()=>router.push("/")} className=' flex flex-row gap-2 bg-black text-white p-2 rounded hover:bg-gray-800 '><CircleChevronLeft /></button>
      </div>
      <div className=' pl-4 pt-4 '>
      <button onClick={()=>setIsModalOpen(true)} className=' flex flex-row gap-2 bg-slate-200 p-2 rounded hover:bg-slate-300 '><SlidersHorizontal /><span className=' text-lg font-semibold ' >Filters</span></button>
      </div></div>
      <FilterModal isOpen={isModalOpen} onClose={handleModalToggle} date={date} setDate={setDate} selectedOption={selectedOption}setSelectedOption={setSelectedOption} onFilter={filterData} />
     <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 pb-4 '>
     {
        filteredTasks.map((task)=>(
            <div key={task?.id} className=" bg-gray-200 text-black rounded opacity-100 p-4 m-4 "  >
            <div className="w-full  ">{task.title}</div>
            <div className=" px-2 ">
              <div></div>
              <div className=" flex text-right items-end justify-end mt-1 gap-2 ">
              <div><button onClick={()=>setDetails(true)}   className=" bg-black text-white px-2 py-1 rounded ">Details</button></div>
                  <div><button onClick={()=>setOpen(true)}   className=" bg-black text-white px-2 py-1 rounded ">Edit</button></div>
                  <div><button onClick={()=>store.deleteTask(task.id)}  className=" bg-black text-white px-2 py-1 rounded ">Delete</button></div>
              <div className={classNames("status",task.state)}>{task.state}</div>
              </div>
              <EditForm isOpen={open} onClose={() => setOpen(false)} task={task} />
              <Details isOpen={details} onClose={() => setDetails(false)} task={task} />
            </div>
          </div>
        ))
      }
     </div>
    </div>
   </div>
  )
}

export default AllTasks