import express from "express";
import userRouter from "./routes/userRouter";
const port = process.env.PORT || 3000;
import "./db/db";
import taskRouter from "./routes/taskRouter";

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
