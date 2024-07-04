import express from "express";
import { ITask } from "../models/task";
import { createTask, getTasks } from "../controllers/taskController";
import auth, { CustomRequest } from "../middleware/auth";

const router = express.Router();

router.post("/create", auth, async (req: CustomRequest, res) => {
  const taskData: Partial<ITask> = {
    title: req.body.title,
    description: req.body.description,
    user: req.user!._id,
  };
  const registeredUser = await createTask(taskData);

  return res.status(200).json(registeredUser);
});

router.get("/", auth, async (req: CustomRequest, res) => {
  const tasks = await getTasks(req.user!._id);
  return res.status(200).json(tasks);
});

export default router;
