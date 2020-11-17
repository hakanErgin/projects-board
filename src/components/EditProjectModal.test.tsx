import React from 'react';
import { EditProjectModal } from './EditProjectModal';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ENTERPRISES, GET_PROJECT } from '../gql';
import wait from 'waait';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// https://github.com/facebook/react/issues/11565
jest.mock('react-dom', () => {
  const original = jest.requireActual('react-dom');
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
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
  render(
    <MockedProvider mocks={mockedQueries} addTypename={false}>
      <EditProjectModal
        selectedProjectId="1"
        isEditProjectModalVisible={true}
        setIsEditProjectModalVisible={jest.fn()}
      />
    </MockedProvider>,
    container
  );
  await act(wait);
  expect(container).toMatchSnapshot();
});

it('s rendered title matches', async () => {
  render(
    <MockedProvider mocks={mockedQueries} addTypename={false}>
      <EditProjectModal
        selectedProjectId="1"
        isEditProjectModalVisible={true}
        setIsEditProjectModalVisible={jest.fn()}
      />
    </MockedProvider>,
    container
  );
  await act(wait);
  expect(
    container.querySelector('div[class="ant-modal-title"]').textContent
  ).toEqual('Edit Sub-Ex');
});
