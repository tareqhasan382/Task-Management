import Tasks from "@/components/ui/Tasks";
import React from "react";

const page = ({ params }) => {
  return <Tasks boardId={params?.boardId} />;
};

export default page;
