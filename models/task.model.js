const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    userid: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    finished: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
