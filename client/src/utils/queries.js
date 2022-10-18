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
      projects {
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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      firstName
      lastName
      github
      linkedin
      skills
      projects {
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
      title 
      description
      createdAt
      gitRepo
      fundingGoal
      currentFunds
    }
  }
`;
