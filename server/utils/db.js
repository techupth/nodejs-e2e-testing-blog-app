import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

export const db = client.db("practice-mongo");
