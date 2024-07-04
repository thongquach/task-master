import { Types } from "mongoose";
import Task, { ITask } from "../models/task";

export const createTask = async (task: Partial<ITask>) => {
  const { title, description, user } = task;
  if (!title) {
    return {
      error: "Please provide all the required fields",
    };
  }

  const newTask = new Task({ title, description, status: "todo", user });
  await newTask.save();
  return { task: newTask };
};

export const getTasks = async (user?: Types.ObjectId) => {
  return Task.find({ user });
};

export const updateTask = async (task: Partial<ITask>) => {
  const { _id, title, description, status, user } = task;
  if (!_id) {
    return {
      error: "Please provide the task ID",
    };
  }

  const existingTask = await Task.findOne({
    _id,
    user,
  });

  if (!existingTask) {
    return {
      error: "Task not found or you are not authorized to update this task.",
    };
  }

  existingTask.title = title || existingTask.title;
  existingTask.description = description || existingTask.description;
  existingTask.status = status || existingTask.status;

  await existingTask.save();
  return { task: existingTask };
};
