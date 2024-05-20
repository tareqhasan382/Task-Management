// import BoardPage from "@/components/BoardPage";
// import { getServerSession } from "next-auth";

import Boards from "@/components/board/Boards";
import React from "react";
// import { redirect } from "next/navigation";
// import { authOptions } from "../../api/auth/[...nextauth]/route";

const page = async () => {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) redirect("/sign-in");
  return <Boards />;
};

export default page;
