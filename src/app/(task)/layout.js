import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/Providers";

import TaskHeader from "@/components/ui/TaskHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskFlow Page",
  description: "Generated by create next app",
};

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/sign-in");
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer />
          <TaskHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
