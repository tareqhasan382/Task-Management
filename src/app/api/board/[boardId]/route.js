import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import BoardModel from "../../../../../lib/models/BoardModel";
import { connectMongodb } from "../../../../../lib/mongodb";

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { productId: string } }
// ) => {
//   try {
//     await connectToDB();

//     const product = await Product.findById(params.productId).populate({
//       path: "collections",
//       model: Collection,
//     });

//     if (!product) {
//       return new NextResponse(
//         JSON.stringify({ message: "Product not found" }),
//         { status: 404 }
//       );
//     }
//     return new NextResponse(JSON.stringify(product), {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
//         "Access-Control-Allow-Methods": "GET",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   } catch (err) {
//     console.log("[productId_GET]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

// export const POST = async (
//   req: NextRequest,
//   { params }: { params: { productId: string } }
// ) => {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectToDB();

//     const product = await Product.findById(params.productId);

//     if (!product) {
//       return new NextResponse(
//         JSON.stringify({ message: "Product not found" }),
//         { status: 404 }
//       );
//     }

//     const {
//       title,
//       description,
//       media,
//       category,
//       collections,
//       tags,
//       sizes,
//       colors,
//       price,
//       expense,
//     } = await req.json();

//     if (!title || !description || !media || !category || !price || !expense) {
//       return new NextResponse("Not enough data to create a new product", {
//         status: 400,
//       });
//     }

//     const addedCollections = collections.filter(
//       (collectionId: string) => !product.collections.includes(collectionId)
//     );
//     // included in new data, but not included in the previous data

//     const removedCollections = product.collections.filter(
//       (collectionId: string) => !collections.includes(collectionId)
//     );
//     // included in previous data, but not included in the new data

//     // Update collections
//     await Promise.all([
//       // Update added collections with this product
//       ...addedCollections.map((collectionId: string) =>
//         Collection.findByIdAndUpdate(collectionId, {
//           $push: { products: product._id },
//         })
//       ),

//       // Update removed collections without this product
//       ...removedCollections.map((collectionId: string) =>
//         Collection.findByIdAndUpdate(collectionId, {
//           $pull: { products: product._id },
//         })
//       ),
//     ]);

//     // Update product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       product._id,
//       {
//         title,
//         description,
//         media,
//         category,
//         collections,
//         tags,
//         sizes,
//         colors,
//         price,
//         expense,
//       },
//       { new: true }
//     ).populate({ path: "collections", model: Collection });

//     await updatedProduct.save();

//     return NextResponse.json(updatedProduct, { status: 200 });
//   } catch (err) {
//     console.log("[productId_POST]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

export const DELETE = async (req, { params }) => {
  try {
    await connectMongodb();
    const { boardId } = params;
    const session = await getServerSession(authOptions);
    // console.log("boardtId:", boardId);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const result = await BoardModel.findByIdAndDelete(boardId);
    // console.log(" delete board result:", result);
    return NextResponse.json(
      {
        message: "Board deleted successfully.",
        success: "true",
        data: result,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("[BOARD_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
