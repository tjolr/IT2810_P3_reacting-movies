import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { typeDefs } from './typeDefs';
import { movieQuery } from './resolvers/movieQuery';
import { reviewsQuery } from './resolvers/reviewsQuery';
import { addReviewMutation } from './resolvers/addReviewMutation';

const startServer = async () => {
  const app = express();

  const resolvers = {
    Query: {
      Movie: movieQuery,
      Reviews: reviewsQuery,
    },
    Mutation: {
      addReview: addReviewMutation,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({ app });

  // Connection to the db using localhost, as we're running
  // the server on the same VM as the database.
  await mongoose.connect('mongodb://localhost/moviedb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen({ port: 3000 }, () => {
    console.log(`server url: http://localhost:3000${server.graphqlPath}`);
  });
};

startServer();
