const helper = require('../helper');

const resolvers = {
  Query: {
    books: () => helper.books,
    hello: () =>
      fetch('https://fourtonfish.com/hellosalut/?mode=auto')
        .then(res => res.json())
        .then(data => data.hello),
   persons:() => helper.person,

  },
};
exports.resolvers = resolvers;
