import {makeExecutableSchema} from 'graphql-tools';

import resolvers from './resolvers.js';

const typeDefs = `

scalar Datetime

type Query {
  # Attributes of the current API user
  viewer: Viewer!
}

type Mutation {
  # Sets the current user's message.
  setMessage(message: String!): Viewer!
}

# Attributes of the user
type Viewer {
  # The id of the current user.
  id: String!

  # The user's message.
  message: String
}


`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;
