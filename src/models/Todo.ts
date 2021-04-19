import TodoSchema from '../schema/TodoSchema';

interface Data {
  content: String,
  date: Date,
  user: {
    userId?: string
  },
  done: Boolean
}

class Todo {
  async create(data: Data) {
    const todo = {
      content: data.content,
      date: data.date,
      userId: data.user.userId,
    };
    await TodoSchema.create(todo);
  }
}

export default new Todo();
