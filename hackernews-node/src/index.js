const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  User,
  // Query: {
  //   info: () => "This is the API of a Hackernews clone",
  //   feed: (root, args, context, info) => {
  //     return context.prisma.links();
  //   },
  //   // link: (parent, args) => {
  //   //   const link = links.find((link) => link.id === args.id);
  //   //   return link || null;
  //   // },
  // },
  // Mutation: {
  //   post: (root, args, context) => {
  //     return context.prisma.createLink({
  //       url: args.url,
  //       description: args.description,
  //     });
  //   },
  //   // updateLink: (parent, args) => {
  //   //   const id = args.id;
  //   //   const link = links.find((link) => link.id === id);
  //   //   if (link) {
  //   //     links = links.map((item) => {
  //   //       if (item.id === id) {
  //   //         item.url = args.url;
  //   //         item.description = args.description;
  //   //       }
  //   //       return item;
  //   //     });
  //   //     console.log(links);
  //   //     return links.find((item) => item.id === id);
  //   //   } else {
  //   //     return null;
  //   //   }
  //   // },
  //   // deleteLink: (parent, args) => {
  //   //   const id = args.id;
  //   //   const link = links.find((link) => link.id === id);
  //   //   if (link) {
  //   //     links = links.filter((link) => link.id !== id);
  //   //     return link;
  //   //   } else {
  //   //     return null;
  //   //   }
  //   // },
  // },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url,
  // },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log("Server is running on http://localhost:4000"));
