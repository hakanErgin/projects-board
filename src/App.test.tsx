import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PROJECTS, REMOVE_PROJECT } from './gql/';
import wait from 'waait';

const projectsMock = {
  request: {
    query: GET_PROJECTS,
  },
  result: {
    data: {
      allProjects: [
        {
          id: '1',
          name: 'Sub-Ex',
          Users: [
            {
              id: '1',
            },
          ],
        },
        {
          id: '2',
          name: 'Second',
          Users: [
            {
              id: '2',
            },
          ],
        },
      ],
    },
  },
};
const deleteProjectMock = {
  request: {
    query: REMOVE_PROJECT,
    variables: { id: '1' },
  },
  result: {
    data: {},
  },
};
it('renders loading state', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const tree = component.toJSON();
  // @ts-ignore
  expect(tree.children).toContain('Loading...');
});

it('renders correctly with mocked data', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await wait(0);
  expect(component).toMatchSnapshot();
});
it('should show 2 elems', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await wait(0);
  const ul = component.root.findByType('ul');
  expect(ul.children.length).toBe(2);
});
it('should show 1 elem after deleting other', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[deleteProjectMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await wait(0);
  const ul = component.root.findByType('ul');
  expect(ul.children.length).toBe(1);
});
