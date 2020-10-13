const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost/moviedb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen({ port: 4000 }, () => {
    console.log(`server url: http//localhost:4000${server.graphqlPath}`);
  });
};

startServer();
