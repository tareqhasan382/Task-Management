import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../../lib/mongodb";
import TaskListModel from "../../../../../lib/models/TaskListModel";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongodb();
    const taskLists = await TaskListModel.find({ bordId: id }).sort({
      order: 1,
    });

    const newOrder = await TaskListModel.countDocuments({ bordId: id });
    return NextResponse.json(
      {
        message: "TaskList retrive successfully.",
        success: true,
        data: taskLists,
        newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Board created failed.", success: false },
      { status: 500 }
    );
  }
}
