import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation($id: ID!, $name: String, $enterprise_id: ID) {
    updateProject(id: $id, name: $name, enterprise_id: $enterprise_id) {
      id
      name
      enterprise_id
      Enterprise {
        id
        name
      }
      Users {
        id
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation($id: ID!, $name: String!, $enterprise_id: ID!) {
    createProject(id: $id, name: $name, enterprise_id: $enterprise_id) {
      id
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation($id: ID!) {
    removeProject(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $project_id: ID) {
    updateUser(id: $id, project_id: $project_id) {
      id
      project_id
    }
  }
`;
