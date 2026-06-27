const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active", "block"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", userSchema);
