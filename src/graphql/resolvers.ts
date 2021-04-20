import Todo from '../repositories/Todo';
import User from '../repositories/User';
import tokenGeneration from '../utils/tokenGeneration';

const resolvers = {
  Query: {
    posts: () => Todo.getAll(),
    users: () => User.getAll(),
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

    createUser: async (_: any, { login, password }: any) => {
      await User.create({ login, password });
      return 'User Created';
    },

    loginUser: async (_: any, { login, password }: any) => {
      const checkUser = await User.findOne({ login, password });

      if (!checkUser) {
        throw new Error('User not found');
      }

      if (!(User.checkPassword(password, checkUser!.password))) {
        throw new Error('Password does not');
      }

      return tokenGeneration(checkUser.id, checkUser.login);
    },
  },
};

export default resolvers;
