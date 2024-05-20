

import React from 'react'

const Details = ({ isOpen, onClose,task }) => {
    
    // const store=dataStore();
    //  console.log("task:",task)
  return (
    <>
      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center'>
          <div className='fixed inset-0 transition-opacity opacity-100 ' onClick={onClose}>
            <div className='absolute inset-0 bg-black opacity-80 '></div>
          </div>
          <div className='bg-white rounded-lg p-8 lg:w-full lg:mx-28 w-96 mx-auto z-50 opacity-100 '>
            <div className=''>
              <h2 className='text-lg font-semibold mb-4 text-center '>Details Task</h2>
              <div>
                <h1 className='  text-black font-bold text-xl '>{task?.title}</h1>
                <div className='border-black border-[1px] border-b  '></div>
              <div
                    className="ProseMirror whitespace-pre-line px-6 py-4 w-full "
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <div
                      className=" ProseMirror whitespace-pre-line  px-6 py-4"
                      style={{ whiteSpace: "pre-line" }}
                      dangerouslySetInnerHTML={{
                        __html: task?.content,
                      }}
                    />
                  </div>
                  <p className=' text-black text-left w-full '> Due Date : {task?.dueDate}</p>
              </div>
            </div>
           <div className=' w-full flex items-end justify-end '>
           <button
                onClick={onClose}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-end justify-end mr-2'
              >
                Close
              </button>
           </div>
             
          </div>
        </div>
      )}
    </>
  )
}

export default Details
//Details