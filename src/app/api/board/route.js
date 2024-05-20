import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import BoardModel from "../../../../lib/models/BoardModel";

export async function POST(req, res) {
  try {
    const data = await req.json();
    await connectMongodb();

    await BoardModel.create(data);
    //console.log("result:", result);
    return NextResponse.json(
      { message: "Board created successfully.", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Board created failed.", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    await connectMongodb();
    const result = await BoardModel.find();

    // console.log("result:", result);
    // await UserModel.create({ name, email, password });
    return NextResponse.json(
      { message: "Board created successfully.", success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Board created failed.", success: false },
      { status: 500 }
    );
  }
}
