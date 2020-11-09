import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProjectModal } from './components/ProjectModal';
import { EditProjectModal } from './components/EditProjectModal';

import './App.css';

const GET_PROJECTS = gql`
  query {
    allProjects {
      id
      name
      enterprise_id
      Users {
        id
      }
    }
  }
`;

function App() {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] = useState(
    false
  );
  const [selectedProjectId, setselectedProjectId] = useState('');

  if (projectsLoading) return <p>Loading...</p>;
  if (projectsError) return <p>Error</p>;

  const { allProjects } = projectsData;
  // console.log('a', allProjects);

  function showModal() {
    setIsProjectModalVisible(true);
  }
  function showEditProjectModal(project_id: any) {
    setselectedProjectId(project_id);
    setIsEditProjectModalVisible(true);
  }

  return (
    <div className="App">
      <ProjectModal
        isProjectModalVisible={isProjectModalVisible}
        setIsProjectModalVisible={setIsProjectModalVisible}
      />
      <EditProjectModal
        selectedProjectId={selectedProjectId}
        isEditProjectModalVisible={isEditProjectModalVisible}
        setIsEditProjectModalVisible={setIsEditProjectModalVisible}
      />
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
              <EditOutlined onClick={() => showEditProjectModal(item.id)} />,
              <DeleteOutlined />,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.Users.length + ' collobrators'}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
