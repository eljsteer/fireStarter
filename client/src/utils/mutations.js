// >>------------------------>>
// GraphQl Mutation Functions
// >>------------------------>>

import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($updateData: UserInput!) {
  updateUser(updateData: $updateData) {
    github
    linkedin
    skills
  }
} 
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($title: String!, $description: String!, $gitRepo: String, $fundingGoal: String, $currentFunds: String) {
    addProject(title: $title, description: $description, gitRepo: $gitRepo, fundingGoal: $fundingGoal, currentFunds: $currentFunds) {
      _id
      title
      description
      gitRepo
      fundingGoal
      currentFunds
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectData: ProjectInput!, $projectId: ID!) {
    updateProject(projectData: $projectData, projectId: $projectId) {
      _id
      email 
      firstName
      lastName
      github
      linkedin
      skills
      userProjects {
        # _id
        title
        description
        gitRepo
        fundingGoal
        currentFunds
      }
    }
  } 
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      title
      description
      gitRepo
      fundingGoal
      currentFunds
    }
  }  
`;
