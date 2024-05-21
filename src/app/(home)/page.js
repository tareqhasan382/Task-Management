import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import Head from "next/head";
import Link from "next/link";
import { getUsers } from "../../../lib/actions/actions";
export const BASEURL = "http://localhost:3000";
export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log("session:", session?.user);
  const users = await getUsers();
  console.log("users:", users);
  // if (!session?.user) redirect("/sign-in");
  return (
    <main className=" w-full h-auto mx-auto overflow-hidden ">
      {/* <Dashboard /> */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <div className="bg-yellow-100 text-yellow-600 py-2 px-4 rounded-full mb-4">
            NO.1 TASK MANAGEMENT
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            TaskFlow helps teams move{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              work forward.
            </span>
          </h1>
          <p className="text-gray-700 mb-6 max-w-xl">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with TaskFlow.
          </p>
          <Link href="/board">
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              Get TaskFlow for free
            </button>
          </Link>
        </main>

        <footer className="w-full bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2024 TaskFlow, Inc. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
