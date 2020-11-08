import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, Modal } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './App.css';

const projects = gql`
  query {
    allProjects {
      id
      name
      enterprise
      collobrators
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(projects);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allProjects } = data;
  // console.log('a', allProjects);

  return (
    <div className="App">
      <List
        header={[
          <div>
            Header
            <PlusOutlined />
          </div>,
        ]}
        className="ProjectList"
        itemLayout="horizontal"
        dataSource={allProjects}
        // rowKey={(item) => item.id}
        renderItem={(item: any, index: any) => (
          <List.Item
            actions={[
              <UserSwitchOutlined />,
              <EditOutlined />,
              <DeleteOutlined />,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.collobrators.length + ' collobrators'}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
