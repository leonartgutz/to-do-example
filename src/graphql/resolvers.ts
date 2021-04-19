import bcryptjs from 'bcryptjs';
import TodoSchema from '../schema/TodoSchema';
import UserSchema from '../schema/UserSchema';

const resolvers = {
  Query: {
    posts: () => TodoSchema.find(),
    users: () => UserSchema.find(),
    filterBy: (_: any, { content, date, done }: any) => {
      const search = {
        content: {
          $regex: content || '',
        },
        date: {
          $gte: new Date(date),
        },
      };
    },
  },

  Mutation: {
    createPost: async (_: any, { content, date, userId }: any) => {
      const result = await TodoSchema.create({ content, date, userId });
      return result;
    },

    deletePost: async (_: any, { post, user }: any) => {
      const removedPost = await TodoSchema.findById(post);

      if (!removedPost) {
        return 'Not Found';
      }

      if (removedPost.userId !== user) {
        return 'You are not the owner of this post';
      }

      await TodoSchema.findByIdAndDelete(post);

      return removedPost;
    },

    createUser: async (_: any, { login, passwordToEncode }: any) => {
      const password = await bcryptjs.hash(passwordToEncode, 8);
      const result = await UserSchema.create({ login, password });

      return result;
    },

    updatePost: async (_: any, {
      postId, content, date, done, userId,
    }: any) => {
      const todo = {
        content,
        date,
        done,
        userId,
      };

      const result = await TodoSchema.findByIdAndUpdate(postId, todo);

      return result;
    },
  },
};

export default resolvers;
