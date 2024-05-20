import { NextResponse } from "next/server";
import TaskListModel from "../../../../lib/models/TaskListModel";
import { connectMongodb } from "../../../../lib/mongodb";

export async function POST(req, res) {
  try {
    const data = await req.json();
    await connectMongodb();

    await TaskListModel.create(data);
    //console.log("result:", result);
    return NextResponse.json(
      { message: "TaskList created successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Board created failed.", success: false },
      { status: 500 }
    );
  }
}
