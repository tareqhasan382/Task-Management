import mongoose, { Schema } from "mongoose";
const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const BoardModel =
  mongoose.models.Board || mongoose.model("Board", boardSchema);
export default BoardModel;
