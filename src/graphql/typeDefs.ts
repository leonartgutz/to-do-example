import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    posts: [Post],
    users: [User],
    filterBy(content: String, date: String, done: Boolean): [Post]
  }

  type User {
    id: ID,
    login: String,
    password: String
  }

  type Post {
    id: ID,
    content: String,
    date: String,
    done: Boolean,
    userId: String
  }

  type Mutation {
    createUser(login: String, passwordToEncode: String): User
    createPost(content: String, date: String, userId: String, done: Boolean): Post
    deletePost(post: ID, user: ID): Post
    updatePost(postId: ID, content: String, date: String, done: Boolean, userId: String): Post
  }
`;

export default typeDefs;
