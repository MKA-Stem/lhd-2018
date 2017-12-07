import dotenv from 'dotenv';
import express from 'express';
import {graphqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import {formatError} from 'apollo-errors';
import {authenticate} from './lib/authMiddleware.js';
import schema from './data/schema';
import {isInstance as isGraphqlError} from 'apollo-errors';

dotenv.config();

const GRAPHQL_PORT = process.env.PORT || 8080;
const DEV = process.env.NODE_ENV === 'development';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    setTimeout(next, 500);
  });
}

app.use(bodyParser.json());
app.use(authenticate(process.env.OAUTH_CLIENT_ID));

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    formatError,
    context: {user: req.user}
  }))
);

app.use((err, req, res, next) => {
  console.log(err);
  if (isGraphqlError(err)) {
    // If we threw the error, format it nicely.
    res.status(400).json(formatError(err));
  } else {
    // If something else broke, just give up.
    res.status(500).json({
      errors: {
        message: DEV ? err.message : 'Internal Error',
        ...(DEV ? {stack: err.stack} : {})
      }
    });
  }
});

app.listen(GRAPHQL_PORT, () =>
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`)
);
