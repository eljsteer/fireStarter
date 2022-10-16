import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        email
      }
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
  mutation addProject($title: String!, $description: String!, $gitRepo: String, $fundingGoal: Number, $currentFunds: Number) {
    addProject(title: $title, description: $description, gitRepo: $gitRepo, $fundingGoal: $fundingGoal, $currentFunds: $currentFunds) {
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
      username 
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
      email 
      username 
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
