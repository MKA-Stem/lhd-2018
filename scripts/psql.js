#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envStr = fs.readFileSync(path.join(__dirname, '..', '.env')).toString();
const env = JSON.parse(envStr);

console.log(`alias sqlconsole=psql\\ ${env.DATABASE_URL}`);
