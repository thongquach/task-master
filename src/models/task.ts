import { Schema, model, Document, Types } from "mongoose";

type TaskStatus = "todo" | "in-progress" | "blocked" | "done";

export interface ITask extends Document {
  title: string;
  status: TaskStatus;
  user: Types.ObjectId;
  description?: string;
}

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "in-progress", "blocked", "done"],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: String,
  },
  {
    methods: {
      toJSON() {
        const task = this as ITask;
        const taskObject = task.toObject();
        return taskObject;
      },
    },
    query: {
      byUserId(userId: Types.ObjectId) {
        return this.find({ userId });
      },
    },
  }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
