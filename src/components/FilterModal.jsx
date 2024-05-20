"use client"
import React from 'react'

const FilterModal = ({ isOpen, onClose ,date,setDate,selectedOption, setSelectedOption,onFilter}) => {

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        onClose

      };
   const handleClear=()=>{
    setSelectedOption('')
    setDate('')
    onClose()
   }
   const handleDone=()=>{
    onFilter({ date, selectedOption });
    onClose()
   }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50 w-full "></div>
          <div className="bg-white p-6 rounded-lg z-50 w-80 ">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div>
            <div className=' w-full mb-4 flex flex-col ' >
              <label htmlFor='Due date' className= ' text-left block text-sm font-medium text-gray-700'>
              Due date
                </label>
              <input
                  type='date'
                  name='date'
                  id='date'
                  className='mt-1 p-2 block w-full rounded-md border-black border-[1px] shadow-sm sm:text-sm'
                  value={date}
                  onChange={e=>setDate(e.target.value)}
                  required
                />
              </div>
              <div className=' w-full mb-4 flex flex-col '>
              <label htmlFor='Status' className= ' text-left block text-sm font-medium text-gray-700'>
              Status
                </label>
              <select
      className='mt-1 p-2 block w-full rounded-md border-black border-[1px] shadow-sm sm:text-sm'
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value=''>Select an option</option>
      <option value='PLANED'>Planed</option>
      <option value='ONGOING'>Ongoing</option>
      <option value='DONE'>Done</option>
    </select>
              </div>
            </div>
          <div className=' w-full flex flex-row gap-3 items-end justify-end '>
          <button onClick={handleClear} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">Clear</button>
            <button onClick={handleDone} className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Done</button>
          </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterModal