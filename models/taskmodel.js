const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
      },
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
      }
},{versionKey:false})

const taskModel = mongoose.model("task",taskSchema)
module.exports = taskModel