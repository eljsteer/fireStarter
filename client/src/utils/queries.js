// >>------------------------>>
// GraphQl Query Functions
// >>------------------------>>

import { gql } from '@apollo/client';

export const QUERY_ME =gql`
  query me {
    me {
      _id
      email 
      firstName
      lastName
      github
      linkedin
      skills
      userProjects {
        _id
        userId
        title 
        description
        createdAt
        gitRepo
        fundingGoal
        currentFunds
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      firstName
      lastName
      github
      linkedin
      skills
      userProjects {
        _id
        title 
        description
        createdAt
        gitRepo
        fundingGoal
        currentFunds
      }
    }
  }
`;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

export const QUERY_PROJECTS = gql`
  {
    userProjects {
      _id
      title 
      description
      createdAt
      gitRepo
      fundingGoal
      currentFunds
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query singleProject($projectId: ID!) {
    singleProject(projectId: $projectId) {
      _id
      userId
      title 
      description
      createdAt
      gitRepo
      fundingGoal
      currentFunds
    }
  }
`;
