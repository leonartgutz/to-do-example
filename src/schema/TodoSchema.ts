import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('todoList', TodoSchema);
