import mongoose from "mongoose";
import { Schema } from "mongoose";
const taskCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tag: {
      type: String,
    },
    subtaskDate: { type: Date },
    order: { type: Number },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    listId: { type: Schema.Types.ObjectId, ref: "tasklists" },
    bordId: { type: Schema.Types.ObjectId, ref: "Board" },
  },
  { timestamps: true }
);
const TaskCardModel =
  mongoose.models.Card || mongoose.model("Card", taskCardSchema);
export default TaskCardModel;

// title , description , subtaskDate , listId , teamMembers
