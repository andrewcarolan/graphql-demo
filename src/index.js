const { ApolloServer } = require("apollo-server");

const fs = require("fs");
const path = require("path");

const users = [
  {
    id: 1,
    name: "Brain",
  },
  {
    id: 2,
    name: "Pinky",
  },
];

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query: {
    info: () => "Hello, GraphQL!",
    users: () => users,
  },
  Mutation: {
    createUser: (parent, args) => {
      const id = users.length + 1;

      const user = {
        id,
        name: args.name,
      };

      users.push(user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
