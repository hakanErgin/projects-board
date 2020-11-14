import React from 'react';
import renderer, { act } from 'react-test-renderer';

import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PROJECTS } from './gql/';

it('renders correctly', async () => {
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
                id: '1',
              },
            ],
          },
        ],
      },
    },
  };

  const component = renderer.create(
    <MockedProvider mocks={[projectsMock]} addTypename={false}>
      <App />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
  expect(component).toMatchSnapshot();
});
