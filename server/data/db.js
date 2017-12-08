import knex from 'knex';
import pg from 'pg';
import Client from 'knex/lib/dialects/postgres';
import Formatter from 'knex/lib/formatter';

// Convert lowerCamelCase to snake_case when talking to pg
// from https://hackernoon.com/camelcase-snake-case-conversion-with-postgresql-and-knex-js-956357872fe4
Client.prototype.wrapIdentifier = value => {
  if (value === '*') return value;
  const matched = value.match(/(.*?)(\[[0-9]\])/);
  if (matched) return Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2];
  return `"${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`).replace(/"/g, '""')}"`;
};

Formatter.prototype.wrapAsIdentifier = value => `"${(value || '').replace(/"/g, '""')}"`;

// Make sure postgres uses ssl to connect
pg.defaults.ssl = true;

const db = knex({
  client: 'pg',
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.DATABASE_URL
});

export default db;
