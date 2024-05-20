import React from 'react'

const Container = (children) => {
  return (
    <div className=" w-full h-auto mx-auto overflow-hidden ">
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">{children} </div>
    </div>
  )
}

export default Container