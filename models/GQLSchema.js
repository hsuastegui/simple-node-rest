const axios = require("axios");
const graphql = require("graphql");
const {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;
const { Product } = require("./product");

const productType = new GraphQLObjectType({
  name: 'product',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLID }
  }
});

const postType = new GraphQLObjectType({
  name: 'post',
  fields: {
    userId: { type: GraphQLInt },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(productType),
      resolve() {
        //return axios.get('http://localhost:3000/api/products').then(res => res.data);
        return Product.find({}).then(result => result);
      }
    },
    posts: {
      type: new GraphQLList(postType),
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, {id}) {
        let url = 'http://jsonplaceholder.typicode.com/posts/';
        if(id) url += id;
        return axios.get(url).then(res => {
          if(!Array.isArray(res.data)){
            return [res.data]
          }
          return res.data
        });
      }
    }
  }
});

// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {}
// });

const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
