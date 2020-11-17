import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { EditProjectModal } from './EditProjectModal';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ENTERPRISES, GET_PROJECT } from '../gql';
import wait from 'waait';

// https://github.com/facebook/react/issues/11565
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

const mockedQueries = [
  {
    request: {
      query: GET_ENTERPRISES,
    },
    result: {
      data: {
        allEnterprises: [
          {
            id: '1',
            name: 'Quop',
          },
          {
            id: '2',
            name: 'Blogspan',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PROJECT,
      variables: { id: '1' },
    },
    result: {
      data: {
        Project: {
          id: '1',
          name: 'Sub-Ex',
          Enterprise: {
            id: '1',
            name: 'Quop',
          },
        },
      },
    },
  },
];

it('renders correctly', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mockedQueries} addTypename={false}>
      <EditProjectModal
        selectedProjectId="1"
        isEditProjectModalVisible={true}
        setIsEditProjectModalVisible={jest.fn()}
      />
    </MockedProvider>
  );
  await act(wait);
  expect(component).toMatchSnapshot();
});
