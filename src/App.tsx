import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProjectModal, EditProjectModal, UserModal } from './components';
import { GET_PROJECTS, REMOVE_PROJECT } from './gql';
import './App.css';

function App() {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(REMOVE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] = useState(
    false
  );
  const [selectedProjectId, setselectedProjectId] = useState('');

  if (projectsLoading) return <p>Loading...</p>;
  if (projectsError) {
    console.log(projectsError);

    return <p>Error</p>;
  }

  const { allProjects } = projectsData;

  function showModal() {
    setIsProjectModalVisible(true);
  }
  function showUserModal(project_id: any) {
    setselectedProjectId(project_id);
    setIsUserModalVisible(true);
  }
  function showEditProjectModal(project_id: any) {
    setselectedProjectId(project_id);
    setIsEditProjectModalVisible(true);
  }
  function removeProject(project_id: any) {
    deleteProject({
      variables: {
        id: project_id,
      },
    });
  }

  return (
    <div className="App">
      {isProjectModalVisible && (
        <ProjectModal
          isProjectModalVisible={isProjectModalVisible}
          setIsProjectModalVisible={setIsProjectModalVisible}
        />
      )}
      {isUserModalVisible && (
        <UserModal
          selectedProjectId={selectedProjectId}
          isUserModalVisible={isUserModalVisible}
          setIsUserModalVisible={setIsUserModalVisible}
        />
      )}
      {isEditProjectModalVisible && (
        <EditProjectModal
          selectedProjectId={selectedProjectId}
          isEditProjectModalVisible={isEditProjectModalVisible}
          setIsEditProjectModalVisible={setIsEditProjectModalVisible}
        />
      )}
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
        rowKey={'id'}
        renderItem={(item: any) => {
          return (
            <List.Item
              key={item.id}
              actions={[
                <UserSwitchOutlined onClick={() => showUserModal(item.id)} />,
                <EditOutlined onClick={() => showEditProjectModal(item.id)} />,
                <DeleteOutlined onClick={() => removeProject(item.id)} />,
              ]}
            >
              <List.Item.Meta
                key={item.id}
                title={
                  <p key={item.id}>
                    {item.name} - {item.id}
                  </p>
                }
                description={item.Users.length + ' collobrators'}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default App;
