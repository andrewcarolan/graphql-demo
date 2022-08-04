const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query: {
    info: () => "Hello, GraphQL!",
    users: async (_parent, _args, { prisma }) => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: (_parent, args, { prisma }) => {
      const { name, email } = args;
      const user = prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return user;
    },
  },
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
