import TodoSchema from '../schema/TodoSchema';

interface Data {
  content: String,
  date: Date,
  user: {
    userId?: string
  },
  done: any
}

interface Search {
  content?: Object,
  date?: Object,
  done?: Object
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

  async getAll(byDate: string, byContent?: string, byStatus?: string) {
    const search: Search = {};

    if (byContent !== undefined) {
      search.content = {
        $regex: byContent,
      };
    }

    if (byDate) {
      search.date = {
        $gte: new Date(byDate),
      };
    }

    switch (byStatus) {
      default:
        search.done = {
          $in: [false, true],
        };
        break;

      case 'true':
        search.done = {
          $in: [true],
        };
        break;

      case 'false':
        search.done = {
          $in: [false],
        };
        break;
    }

    return TodoSchema.find(search);
  }
}

export default new Todo();
