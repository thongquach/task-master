import express from 'express';
import { Types } from 'mongoose';

import { CustomRequest } from '../middleware/auth';
import { ITask } from '../models/task';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../services/taskService';

const router = express.Router();

// TODO: middleware to validate user input: type/format/required using library utilizing schema
// TODO: swagger docs
router.post('/', async (req: CustomRequest, res) => {
  const taskData: Partial<ITask> = {
    title: req.body.title,
    description: req.body.description,
    user: req.user!._id,
  };
  const newTask = await createTask(taskData);

  return res.status(200).json(newTask);
});

router.get('/', async (req: CustomRequest, res) => {
  const tasks = await getTasks(req.user!._id);
  return res.status(200).json({ tasks });
});

router.get('/:taskId', async (req: CustomRequest, res) => {
  const taskId = new Types.ObjectId(req.params.taskId);
  const task = await getTask(taskId, req.user!._id);
  return res.status(200).json({ task });
});

router.put('/:taskId', async (req: CustomRequest, res) => {
  const taskData: Partial<ITask> = {
    _id: new Types.ObjectId(req.params.taskId),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    user: req.user!._id,
  };
  const updatedTask = await updateTask(taskData);

  // TODO: add error handling middleware with custom error class
  // UnauthorizedError -> 403, Unauthenticated -> 401, NotFoundError -> 404
  if (updatedTask?.error) {
    return res.status(400).json({
      error: updatedTask.error,
    });
  }

  return res.status(200).json(updatedTask);
});

router.delete('/:taskId', async (req: CustomRequest, res) => {
  const taskId = new Types.ObjectId(req.params.taskId);
  const deletedTask = await deleteTask(taskId, req.user!._id);

  if (deletedTask?.error) {
    return res.status(400).json({
      error: deletedTask.error,
    });
  }

  return res.status(200).json(deletedTask);
});

export default router;
