const express = require("express");
const app = express();
const mongoose = require('mongoose')

app.use(express())



mongoose
  .connect(
    "mongodb+srv://mdjaber:jhjaber2004@cluster1.gxwb1gq.mongodb.net/todoList?appName=Cluster1",
  )
  .then(() => {
    console.log("DataBase Connected");
  });


app.listen(5000, ()=>{
    console.log('Server is Running 5000 port');
})