const Todo = require("../models/userModel");
const todoController =  (req, res) => {
  const { task, status, priority } = req.body;

  if (!task || !status) {
    return res.send({
      success: false,
      message: "Please fill the all fields",
    });
  }

  const newTodo = new Todo({
    task: task,
    priority: priority,
  });

  res.send({
    success: true,
    message: "Task Add",
  });
};

module.exports = todoController;
