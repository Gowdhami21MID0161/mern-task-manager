const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
