const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "www.howtographql.com",
  },
];

const idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is the API of a Hackernews clone",
    feed: () => links,
    link: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      return link || null;
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const id = args.id;
      const link = links.find((link) => link.id === id);
      if (link) {
        links = links.map((item) => {
          if (item.id === id) {
            item.url = args.url;
            item.description = args.description;
          }
          return item;
        });
        console.log(links);
        return links.find((item) => item.id === id);
      } else {
        return null;
      }
    },
    deleteLink: (parent, args) => {
      const id = args.id;
      const link = links.find((link) => link.id === id);
      if (link) {
        links = links.filter((link) => link.id !== id);
        return link;
      } else {
        return null;
      }
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log("Server is running on http://localhost:4000"));
