import bcryptjs from 'bcryptjs';
import TodoSchema from '../schema/TodoSchema';
import UserSchema from '../schema/UserSchema';

const resolvers = {
  Query: {
    posts: () => TodoSchema.find(),
  },
  Mutation: {
    createPost: async (_: any, { content, date, userId }: any) => {
      const result = await TodoSchema.create({ content, date, userId });
      return result;
    },
    deletePost: async (_: any, { id }: any) => {
      const removedPost = await TodoSchema.findById(id);

      if (!removedPost) {
        return 'Not Found';
      }

      await TodoSchema.findByIdAndDelete(id);

      return removedPost;
    },
    createUser: async (_: any, { login, passwordToEncode }: any) => {
      const password = await bcryptjs.hash(passwordToEncode, 8);
      const result = await UserSchema.create({ login, password });

      return result;
    },
  },
};

export default resolvers;
