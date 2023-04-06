var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const openJSON = require('./MyLittleDB/src/openJson.js')

const myDB = openJSON("./MyLittleDB/items.json")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: Int!
    name: String!
    second_name: String!
  }

  type Query {
    getUserbyID(id: Int!): User
  }
`);

class User {
  constructor({id}) {
    this.id = id
    this.name = myDB.users.filter((item) => {return item.id == this.id})[0]['name']
    this.second_name = myDB.users.filter((item) => {return item.id == this.id})[0]['second_name']
  } 
}

// const danil = new User({id:1})

var root =  {
  getUserbyID: (id) => {
    return new User(id);
  }
}

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');