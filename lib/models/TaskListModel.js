import mongoose from "mongoose";
import { Schema } from "mongoose";
const taskListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: { type: Number, required: true },
    bordId: { type: Schema.Types.ObjectId, ref: "Board" },
  },
  { timestamps: true }
);

const TaskListModel =
  mongoose.models.TaskList || mongoose.model("TaskList", taskListSchema);
export default TaskListModel;
