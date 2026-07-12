const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const mariadb = require('mariadb');
require('dotenv').config();

const url = process.env.DATABASE_URL || "mysql://root:root@localhost:3306/ecosphere";
// Simple parsing of mysql connection string
// e.g. mysql://user:password@host:port/database
const match = url.match(/mysql:\/\/([^:]+)(?::([^@]+))?@([^:\/]+)(?::(\d+))?\/(.+)/);

if (!match) {
  throw new Error("Invalid DATABASE_URL format. Must be mysql://user:password@host:port/database");
}

const [,, password, host, portStr, database] = match;
const username = match[1];
const port = portStr ? parseInt(portStr) : 3306;

console.log('Prisma DB Helper connecting to:', {
  host,
  port,
  username,
  password: password ? '***' : 'none',
  database
});

const adapter = new PrismaMariaDb({
  host,
  port,
  user: username,
  password: password || '',
  database,
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
