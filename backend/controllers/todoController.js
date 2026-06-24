const Todo = require("../models/userModel");
const todoController = async (req, res) => {
  const { task, status, priority } = req.body;
  console.log(task);
  if (!task || !priority) {
    return res.send({
      success: false,
      message: "Please Fil the all fields",
    });
  }

  const newTodo = new Todo({
    task: task,
    priority: priority,
  });
  await  newTodo.save();
  res.send({
    success: true,
    message: "Task  add",
  });
};

module.exports = todoController;
