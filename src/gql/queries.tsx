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
