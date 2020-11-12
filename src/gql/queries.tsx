import { gql } from '@apollo/client';

export const GET_ENTERPRISES = gql`
  query {
    allEnterprises {
      id
      name
    }
  }
`;

export const GET_PROJECT = gql`
  query($id: ID!) {
    Project(id: $id) {
      id
      name
      Enterprise {
        id
        name
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query {
    allProjects {
      id
      name
      Users {
        id
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      email
      first_name
      last_name
    }
  }
`;

export const GET_USERS_BY_PROJECT = gql`
  query($id: ID!) {
    Project(id: $id) {
      Users {
        id
        first_name
        last_name
        avatar
        email
        project_id
      }
    }
  }
`;
