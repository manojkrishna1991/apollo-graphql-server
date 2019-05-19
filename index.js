const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const schema = require('./schema');
const resolverHandler = require('./resolverHandler');
const { MemcachedCache } = require('apollo-server-cache-memcached');
const env = require('dotenv').config();



// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.




const typeDefs = schema.typeDefs;
const resolvers = resolverHandler.resolvers;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new MemcachedCache(
      ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      { retries: 10, retry: 10000 }, // Options
    ),
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
