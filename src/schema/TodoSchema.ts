import mongoose from 'mongoose';

interface ITodo extends mongoose.Document {
  content: String,
  date: Date,
  done: Boolean,
  userId: String
}

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

export default mongoose.model<ITodo>('todoList', TodoSchema);
