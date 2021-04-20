import TodoSchema from '../schema/TodoSchema';

interface Search {
  content?: Object,
  date?: Object,
  done?: Object
}

class Todo {
  async create(data: any) {
    const todo = {
      content: data.content,
      date: data.date,
      userId: data.userId,
    };
    return TodoSchema.create(todo);
  }

  async getAll(byDate?: string, byContent?: string, byStatus?: string) {
    const search: Search = {};

    // Content Filter
    if (byContent !== undefined) {
      search.content = {
        $regex: byContent,
      };
    }

    // Date Filter
    if (byDate) {
      search.date = {
        $gte: new Date(byDate),
      };
    }

    // Status Filter
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

  async getOne(id: string) {
    return TodoSchema.findById(id).exec();
  }

  async update(id: string, data: any) {
    const todo: any = {
      done: data.done,
    };

    if (data.content) {
      todo.content = data.content;
    }

    if (data.date) {
      todo.date = data.date;
    }

    return TodoSchema.findByIdAndUpdate(id, todo);
  }

  async delete(id: string) {
    return TodoSchema.findByIdAndRemove(id);
  }
}

export default new Todo();
