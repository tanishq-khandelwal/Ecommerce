import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

dotenv.config();

const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL; // Hasura endpoint
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET; // Admin secret if enabled

export const hasuraClient = new GraphQLClient(HASURA_GRAPHQL_URL, {
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});
