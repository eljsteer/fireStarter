import { gql } from '@apollo/client';

export const QUERY_ME =gql`
  query me {
    me {
      _id
      username 
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
      username
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
  query userProjects {
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
    project(projectId: $projectId) {
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
