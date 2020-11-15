import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PROJECTS } from './gql/';
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

it('renders loading state', () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const tree: any = component.toJSON();
  expect(tree.children).toContain('Loading...');
});
it('renders correctly with mocked data', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await act(wait);
  expect(component).toMatchSnapshot();
});
it('should show 2 elems fetched', async () => {
  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await act(wait);
  const ul = component.root.findByType('ul');
  expect(ul.children.length).toBe(2);
});
