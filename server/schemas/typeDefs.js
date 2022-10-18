const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    github: String!
    linkedin: String
    skills: String!
    userProjects: [Project]
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
    createdAt: String
    gitRepo: String!
    fundingGoal: Float!
    currentFunds: Float!
  }

  input ProjectInput {
    title: String!
    description: String 
    gitRepo: String
    fundingGoal: Float
    currentFunds: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    userProjects: [Project]
    singleProject(projectId: ID!): Project
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String!, gitRepo: String, fundingGoal: Float, currentFunds: Float): Project
    updateProject(projectData: ProjectInput!, projectId: ID!): Project
    removeProject(projectId: ID!): Project
  }
`;

module.exports = typeDefs;
