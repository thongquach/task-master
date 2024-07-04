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
  return newTask;
};

export const getTasks = async (user?: Types.ObjectId) => {
  return Task.find({ user });
};
