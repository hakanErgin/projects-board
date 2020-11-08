import React, { FC } from 'react';
import { List, Avatar } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const ant = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const projects = gql`
  query {
    allProjects {
      id
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(projects);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) console.log(data);

  return (
    <div className="App">
      <List
        header={[
          <div>
            Header <div>Header</div>
          </div>,
        ]}
        className="ProjectList"
        itemLayout="horizontal"
        dataSource={ant}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <UserSwitchOutlined />,
              <EditOutlined />,
              <DeleteOutlined />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
