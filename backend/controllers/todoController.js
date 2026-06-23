const Todo = require("../models/userModel");
const todoController = (req, res) => {
  const { task, status, priority } = req.body;
  console.log(task);

  if (!task || !priority) {
    return res.send({
      success: false,
      message: "Please fill the all fields",
    });
    const newTodo = new Todo({
      task: task,
      priority: priority,
    });
    newTodo.save();
    res.send({
      success: true,
      message: "Task add",
    });
    if (!task || !priority) {
      return res.send({
        success: false,
        message: "Please fill all the field",
      });
    }

    const todo = new Todo({
      task: task,
      priority: priority,
    });

    todo.save();
    res.send({
      success: true,
      message: "Todo created",
    });
  }
};

module.exports = todoController;
