import { getServerSession } from "next-auth";
// import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

const PrivateRoute = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");
  return children;
};

export default PrivateRoute;
