import { NextResponse } from "next/server";
import TaskCardModel from "../../../../../lib/models/TaskCardModel";
import { connectMongodb } from "../../../../../lib/mongodb";
import TaskListModel from "../../../../../lib/models/TaskListModel";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongodb();
    const taskLists = await TaskCardModel.find({ bordId: id });
    // const taskListsWithCards = await Promise.all(
    //   taskLists.map(async (taskList) => {
    //     const taskCards = await TaskCardModel.find({ listId: taskList._id });
    //     return {
    //       taskCards,
    //     };
    //   })
    // );

    return NextResponse.json(
      {
        message: "TaskList retrive successfully.",
        success: true,
        data: taskLists,
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

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    await connectMongodb();
    const updatedData = await req.json();
    const updatedCard = await TaskCardModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // console.log("updatedCard:", updatedCard);
    return NextResponse.json(
      {
        message: "TaskCard updated successfully.",
        success: true,
        data: updatedCard,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "TaskCard update failed.", success: false },
      { status: 500 }
    );
  }
}
export const DELETE = async (req, { params }) => {
  try {
    await connectMongodb();
    const { id } = params;
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const result = await TaskCardModel.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "Card deleted successfully.",
        success: "true",
        data: result,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("[CARD_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    await connectMongodb();
    const updatedData = await req.json();

    // const updatedCard = await TaskCardModel.findByIdAndUpdate(id, updatedData, {
    //   new: true,
    // });

    console.log("updatedCard:", updatedData);
    return NextResponse.json(
      {
        message: "TaskCard updated successfully.",
        success: true,
        data: "",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "TaskCard update failed.", success: false },
      { status: 500 }
    );
  }
}
