require("node:dns").setServers(["1.1.1.1"], ["8.8.8.8"]);
const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const {
  todoController,
  allTodosGetController,
  deleteTodosController,
  updateTodosController,
} = require("./controllers/todoController");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mdjaber:jhjaber2004@cluster1.gxwb1gq.mongodb.net/todoList?appName=Cluster1",
  )
  .then(() => {
    console.log("DataBase Connected");
  });

app.post("/todo", todoController);
app.get("/allTodosGet", allTodosGetController);
app.delete('/deleteTodos/:id', deleteTodosController)
app.post("/updateTask/:id", updateTodosController);

app.listen(5000, () => {
  console.log("Server is Running 5000 port");
});
