import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
         <Head>
          <title>TaskFlow - Project Management</title>
          <meta
            name="description"
            content="Collaborate, manage projects, and reach new productivity peaks with TaskFlow."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="w-full bg-white py-4 px-6 shadow-md flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full mr-2"></div>
            <span className="text-2xl font-bold">TaskFlow</span>
          </div>
          <div className=" flex items-start ">
          <Link href="/sign-in">  <button className="bg-black py-2 px-4 text-white rounded hover:bg-gray-800 transition duration-300 ">
              Login
            </button></Link>
            <Link href="/board">
              <button className="bg-black hidden sm:block text-white py-2 px-4 ml-2 rounded hover:bg-gray-800 transition duration-300 ">
                Get TaskFlow for free
              </button>
            </Link>
          </div>
        </header>
    </div>
  )
}

export default Header