import TodoSchema from '../schema/TodoSchema';

interface Data {
  content: String,
  date: Date,
  userId: Number,
  done: Boolean
}

class Todo {
  async create(data: Data) {
    await TodoSchema.create(data);
  }
}

export default new Todo();
