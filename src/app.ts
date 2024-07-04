import "./db/db";
import express from "express";
import userRouter from "./routers/userRouter";
import taskRouter from "./routers/taskRouter";
import authMiddleware from "./middleware/auth";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", authMiddleware, taskRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
