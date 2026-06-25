const Todo = require("../models/userModel");
const todoController = async (req, res) => {
  const { task, status, priority } = req.body;
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
  newTodo.save();
  res.send({
    success: true,
    message: "Task add",
  });
};

const allTodosGetController = async (req, res) => {
  const data = await Todo.find({});
  res.send({
    success: true,
    message: "All Task ",
    data: data,
  });

};

const deleteTodosController = async (req, res)=>{
  const {id} = req.params
  const deleteTask = await Todo.findByIdAndDelete(id, req.body)
}

module.exports = {
  todoController,
  allTodosGetController,
  deleteTodosController,
};
