import { Schema, model, Document, Types } from 'mongoose';

type TaskStatus = 'todo' | 'in-progress' | 'blocked' | 'done';

// TODO: add indexes for models
export interface ITask extends Document<Types.ObjectId> {
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
      enum: ['todo', 'in-progress', 'blocked', 'done'],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
  },
  {
    methods: {
      toJSON() {
        const task = this as ITask;
        const taskObject = task.toObject();
        delete taskObject.user;
        return taskObject;
      },
    },
  },
);

const Task = model<ITask>('Task', taskSchema);

export default Task;
