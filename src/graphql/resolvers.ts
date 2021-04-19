import bcryptjs from 'bcryptjs';
import Todo from '../repositories/Todo';
import TodoSchema from '../schema/TodoSchema';
import UserSchema from '../schema/UserSchema';

const resolvers = {
  Query: {
    posts: () => TodoSchema.find(),
    users: () => UserSchema.find(),
    filterBy: (_: any, args: any) => Todo.getAll(args.date, args.content, args.done),
  },

  Mutation: {
    createPost: async (_: any, { content, date, userId }: any) => {
      const result = await Todo.create({ content, date, userId });
      return result;
    },

    deletePost: async (_: any, { post, user }: any) => {
      const checkOwnership = await Todo.getOne(post);

      if (!checkOwnership) {
        return 'Not Found';
      }

      if (checkOwnership.userId.toString() !== user) {
        return 'You are not the owner of this post';
      }

      await Todo.delete(post);

      return 'Post Deleted';
    },

    updatePost: async (_: any, {
      postId, content, date, done, userId,
    }: any) => {
      const todo = {
        content,
        date,
        done,
      };

      const checkOwnership = await Todo.getOne(postId);

      if (!checkOwnership) {
        return 'Not Found';
      }

      if (checkOwnership.userId.toString() !== userId) {
        return 'You are not the owner of this post';
      }

      await Todo.update(postId, todo);

      return 'Post Updated';
    },

    createUser: async (_: any, { login, passwordToEncode }: any) => {
      const password = await bcryptjs.hash(passwordToEncode, 8);
      const result = await UserSchema.create({ login, password });

      return result;
    },
  },
};

export default resolvers;
