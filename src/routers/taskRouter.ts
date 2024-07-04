import express from "express";
import { ITask } from "../models/task";
import { createTask, getTasks, updateTask } from "../services/taskService";
import { CustomRequest } from "../middleware/auth";

const router = express.Router();

router.post("/create", async (req: CustomRequest, res) => {
  const taskData: Partial<ITask> = {
    title: req.body.title,
    description: req.body.description,
    user: req.user!._id,
  };
  const newTask = await createTask(taskData);

  return res.status(200).json(newTask);
});

router.get("/", async (req: CustomRequest, res) => {
  const tasks = await getTasks(req.user!._id);
  return res.status(200).json(tasks);
});

router.post("/update", async (req: CustomRequest, res) => {
  const taskData: Partial<ITask> = {
    _id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    user: req.user!._id,
  };
  const updatedTask = await updateTask(taskData);

  if (updatedTask?.error) {
    return res.status(400).json({
      error: updatedTask.error,
    });
  }

  return res.status(200).json(updatedTask);
});

export default router;
