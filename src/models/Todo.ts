import TodoSchema from '../schema/TodoSchema';

class Todo {
  async create(data: any) {
    await TodoSchema.create(data);
  }
}

export default new Todo();
