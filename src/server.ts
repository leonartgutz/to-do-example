import { ApolloServer } from 'apollo-server-express';
import app from './index';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }: any) => ({ req, res }),
});

server.applyMiddleware({ app });

app.listen(3333);
