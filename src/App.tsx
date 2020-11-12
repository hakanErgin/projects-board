import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { AddProjectModal, EditProjectModal, UserModal } from './components';
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

  const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState(
    false
  );
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
    setIsAddProjectModalVisible(true);
  }
  function showUserModal(projectId: any) {
    setselectedProjectId(projectId);
    setIsUserModalVisible(true);
  }
  function showEditProjectModal(projectId: any) {
    setselectedProjectId(projectId);
    setIsEditProjectModalVisible(true);
  }
  function removeProject(projectId: any) {
    deleteProject({
      variables: {
        id: projectId,
      },
    });
  }

  return (
    <div className="App">
      {isAddProjectModalVisible && (
        <AddProjectModal
          isAddProjectModalVisible={isAddProjectModalVisible}
          setIsAddProjectModalVisible={setIsAddProjectModalVisible}
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
