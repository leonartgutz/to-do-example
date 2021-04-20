import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    posts: [Post],
    users: [User],
    filterBy(content: String, date: String, done: String): [Post]
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

  type Session {
    token: String
  }

  type Mutation {
    createUser(login: String, password: String): String
    loginUser(login: String!, password: String!): Session
    createPost(content: String!, date: String!, done: Boolean): Post
    deletePost(post: ID!, user: ID!): String
    updatePost(postId: ID!, content: String, date: String, done: Boolean!, userId: String!): String
  }
`;

export default typeDefs;
