const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const fundingAmount = new Map([
  [1, {priceInCents: 1000, name: "Invest $10"}],
  [2, {priceInCents: 2000, name: "Invest $20"}],
  [3, {priceInCents: 4000, name: "Invest $40"}],
  [4, {priceInCents: 5000, name: "Invest $50"}],
  [5, {priceInCents: 10000, name: "Invest $100"}],
  [6, {priceInCents: 20000, name: "Invest $200"}],
  [7, {priceInCents: 50000, name: "Invest $500"}],
  [8, {priceInCents: 100000, name: "Invest $1000"}],
])

// create new Apollo server and integrate with express
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🔥 API server running on port ${PORT}`);
      console.log(`🌍 GraphQL in use at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);