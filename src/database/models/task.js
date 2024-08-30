import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"]
    },
    completionTime: {
        type: Date,
        required: false
    }, 
    priority: {
        type: String,
        required: [true, "Priority is required"]
    },
},
    { timestamps: true }
);

const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);

export default Task;