const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Post = require("./resolvers/Post");
const User = require("./resolvers/User");

const resolvers = {
  Query,
  Mutation,
  Post,
  User,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
