const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    github: String!
    linkedin: String
    skills: String!
    projects: [Project]
  }

  type Project {
    _id: ID!
    title: String!
    description: String!
    createdAt: Date
    gitRepo: String!
    fundingGoal: Number!
    currentFunds: Number!
  }

  input ProjectInput {
    title: String!
    description: String, 
    gitRepo: String, 
    fundingGoal: Number, 
    currentFunds: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    userProjects(username: String): [Project]
    singleProject(projectId: ID!): Project
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String!, gitRepo: String, fundingGoal: Number, currentFunds: Number): Project
    updateProject(projectData: ProjectInput!, projectId: ID!): Project
    removeProject(projectId: ID!): Project
  }
`;

module.exports = typeDefs;
