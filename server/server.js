import dotenv from 'dotenv';
import express from 'express';
import {graphqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import {formatError} from 'apollo-errors';
import {authenticate} from './lib/authMiddleware.js';
import schema from './data/schema';
import {isInstance as isGraphqlError} from 'apollo-errors';
import {resolve} from 'path';
import fs from 'fs';

dotenv.config();
const SPA_ROOT = resolve('../client/build');

const GRAPHQL_PORT = process.env.PORT || 8080;
const DEV = process.env.NODE_ENV === 'development';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    setTimeout(next, 500);
  });
}

app.use(
  '/graphql',
  bodyParser.json(),
  authenticate(process.env.OAUTH_CLIENT_ID),
  graphqlExpress(req => ({
    schema,
    formatError,
    context: {user: req.user}
  }))
);

// Make sure it can find the SPA
const indexPath = resolve(SPA_ROOT, 'index.html');
if (!DEV && indexPath) {
  console.log(`SPA index at: ${indexPath}`);
  if (!fs.existsSync(indexPath)) {
    console.error("Can't find SPA static files. Exiting.");
    process.exit(1);
  }
}

// Serve SPA files
app.use(express.static(SPA_ROOT));

app.get('*', (req, res, next) => {
  res.sendFile(SPA_ROOT + '/index.html');
});

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
