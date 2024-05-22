import { NextResponse } from "next/server";
import UserModel from "../../../../lib/models/UserModel";
import { connectMongodb } from "../../../../lib/mongodb";
export async function GET(req, res) {
  try {
    await connectMongodb();
    const existUser = await UserModel.find();

    if (!existUser) {
      return NextResponse.json(
        { message: "User Not exist.", success: "false" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "User retrive successfully.", success: true, data: existUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User retrive failed.", success: false },
      { status: 500 }
    );
  }
}
