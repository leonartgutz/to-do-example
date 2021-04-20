import Todo from '../repositories/Todo';
import User from '../repositories/User';
import tokenDecode from '../utils/tokenDecode';
import tokenGeneration from '../utils/tokenGeneration';

const resolvers = {
  Query: {
    posts: () => Todo.getAll(),
    users: () => User.getAll(),
    filterBy: (_: any, args: any) => Todo.getAll(args.date, args.content, args.done),
  },

  Mutation: {
    // Create Post Mutation
    createPost: async (_: any, { content, date }: any, { req }: any) => {
      const userId = tokenDecode(req.cookies);

      const result = await Todo.create({ content, date, userId });
      return result;
    },

    // Delete Post Mutation
    deletePost: async (_: any, { post }: any, { req }: any) => {
      const userId = tokenDecode(req.cookies);

      const checkOwnership = await Todo.getOne(post);

      if (!checkOwnership) {
        return 'Not Found';
      }

      if (checkOwnership.userId.toString() !== userId) {
        return 'You are not the owner of this post';
      }

      await Todo.delete(post);

      return 'Post Deleted';
    },

    // Update Post Mutation
    updatePost: async (_: any, {
      postId, content, date, done,
    }: any, { req }: any) => {
      const userId = tokenDecode(req.cookies);

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

    // Create User Mutation
    createUser: async (_: any, { login, password }: any) => {
      await User.create({ login, password });
      return 'User Created';
    },

    // Login Mutation
    loginUser: async (_: any, { login, password }: any, { res }: any) => {
      const checkUser = await User.findOne({ login, password });

      if (!checkUser) {
        throw new Error('User not found');
      }

      if (!(User.checkPassword(password, checkUser!.password))) {
        throw new Error('Password does not match');
      }

      const getToken: any = tokenGeneration(checkUser.id, checkUser.login);

      res.cookie('graph-cookie', getToken.token);

      return getToken;
    },
  },
};

export default resolvers;
