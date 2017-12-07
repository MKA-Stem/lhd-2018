import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';

// From https://github.com/apollographql/apollo-tutorial-kit

// Basically, wrap a JS Date obj.
const Datetime = new GraphQLScalarType({
  name: 'Datetime',
  description: 'Represents a point in time, as a UTC Unix millisecond timestamp.',
  serialize(value) {
    if (typeof value === 'string') {
      value = new Date(value);
    }
    return value.getTime();
  },

  parseValue(value) {
    return new Date(value);
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
});

export default Datetime;
