import express from "express";
import { ITask } from "../models/task";
import { createTask } from "../controllers/taskController";
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

export default router;
