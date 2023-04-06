var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const openJSON = require('./MyLittleDB/src/openJson.js')

const myDB = openJSON("./MyLittleDB/items.json")

console.log(myDB);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    user: 
  }
`);

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: myDB,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');