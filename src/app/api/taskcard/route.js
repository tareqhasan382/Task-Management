import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import TaskCardModel from "../../../../lib/models/TaskCardModel";

export async function POST(req, res) {
  try {
    const data = await req.json();
    await connectMongodb();
    // console.log("data:", data);
    await TaskCardModel.create(data);
    return NextResponse.json(
      { message: "Task Card created successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Task Card created failed.", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    await connectMongodb();
    const result = await TaskCardModel.find();
    // console.log("All List:", result);
    return NextResponse.json(
      {
        message: "Task Card retrive successfully.",
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Task Card retrive failed.", success: false },
      { status: 500 }
    );
  }
}
