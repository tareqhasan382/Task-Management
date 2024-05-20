"use client"
import { dataStore } from '@/store/dataStore';
import React, { useState } from 'react'
import EditTipTap from './EditTipTap';

const EditForm = ({ isOpen, onClose,task }) => {
    
  const [content, setContent] = useState(task?.content);
  const {editTask} = dataStore();
    const [formData, setFormData] = useState({
        title: task?.title,
        state: task.state,
        dueDate:task.dueDate
      });
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
      const handleContentChance = (value) => {
        setContent(value);
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data={
          title: formData.title,
          dueDate: formData.dueDate,
          content: content,
          state: formData.state
        }
        editTask(task.id, data);
        setFormData({
            title: "",
            state: "",
            dueDate:'',
          });
          setContent("")
        onClose(); 
      };
  return (
    <>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center cursor-default '>
          <div className='fixed inset-0 transition-opacity opacity-100 ' onClick={onClose}>
            <div className='absolute inset-0 bg-black opacity-80 '></div>
          </div>
          <div className='bg-white rounded-lg p-8 lg:w-full lg:mx-28 w-96 mx-auto z-50 opacity-100 '>
            <div className='text-center'>
              <h2 className='text-lg font-semibold mb-4'>Edit Task</h2>
              <div>
              <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='title' className=' text-left block text-sm font-medium text-gray-700'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='mt-1 p-2 block w-full rounded-md border-black border-[1px] shadow-sm sm:text-sm'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" my-2 w-full cursor-text ">
            <EditTipTap
              content={content}
              onChange={(newContent) => handleContentChance(newContent)}
            />
            {/* {contentError && (
              <span className="text-sm text-red-500 ">Story is required</span>
            )} */}
          </div>
          <div className='mb-4 '>
              <label htmlFor='Due date' className= ' text-left block text-sm font-medium text-gray-700'>
              Due date
                </label>
              <input
                  type='date'
                  name='dueDate'
                  id='dueDate'
                  className='mt-1 p-2 block w-full rounded-md border-black border-[1px] shadow-sm sm:text-sm'
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-6 text-center opacity-100 flex flex-row justify-between w-full '>
            <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2'
                >
                  Submit
                </button>
              <button
                onClick={onClose}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2'
              >
                Close
              </button>
            </div>
              </form>
              </div>
            </div>
          
          </div>
        </div>
      )}
    </>
  )
}

export default EditForm