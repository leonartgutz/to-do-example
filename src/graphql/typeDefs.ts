import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    posts: [Post],
    users: [User]
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
    userId: User
  }

  type Mutation {
    createUser(login: String, passwordToEncode: String): User
    createPost(content: String, date: String, userId: String, done: Boolean): Post
    deletePost(postId: ID, userId: ID): Post
  }
`;

export default typeDefs;
