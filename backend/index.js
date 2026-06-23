require('node:dns').setServers(['1.1.1.1'], ['8.8.8.8'])
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const todoController = require('./controllers/todoController');

app.use(express.json())

mongoose
  .connect(
    "mongodb+srv://mdjaber:jhjaber2004@cluster1.gxwb1gq.mongodb.net/todoList?appName=Cluster1",
  )
  .then(() => {
    console.log("DataBase Connected");
  });

  app.post('/create/todo', todoController)


app.listen(5000, ()=>{
    console.log('Server is Running 5000 port');
})