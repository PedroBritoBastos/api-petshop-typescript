import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";
var connectionString = "".concat(process.env.DATABASE_URL);
var adapter = new PrismaBetterSqlite3({ url: connectionString });
var prisma = new PrismaClient({ adapter: adapter });
export { prisma };
