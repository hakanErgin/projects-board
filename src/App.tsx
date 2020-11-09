import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, Modal, Button } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProjectModal } from './components/ProjectModal';
import './App.css';

const projects = gql`
  query {
    allProjects {
      id
      name
      enterprise_id
      collobrators
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(projects);
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allProjects } = data;
  // console.log('a', allProjects);

  function showModal() {
    setIsProjectModalVisible(true);
  }

  function handleOk(e: any) {
    console.log(e);
    setIsProjectModalVisible(false);
  }

  function handleCancel(e: any) {
    console.log(e);
    setIsProjectModalVisible(false);
  }

  return (
    <div className="App">
      <Modal
        title="Add Project"
        visible={isProjectModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button key="submit" type="primary" onClick={handleOk}>
            Add Project
          </Button>
        }

        // footer={<Button}
      >
        <ProjectModal />
      </Modal>
      <List
        header={[
          <div>
            Header
            <PlusOutlined onClick={showModal} />
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
