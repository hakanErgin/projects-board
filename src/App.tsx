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
import { Project } from './types';

function App() {
  const [selectedProjectId, setselectedProjectId] = useState<string>('');

  // modal visibilty states
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState<
    boolean
  >(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState<boolean>(false);
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] = useState<
    boolean
  >(false);

  // gpl api hooks
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    errorPolicy: 'ignore',
  });

  // making sure fetched data is ready
  if (projectsLoading) return <p>Loading...</p>;
  if (projectsError) return <p>Error</p>;

  // modal visibility functions
  function showAddProjectModal() {
    setIsAddProjectModalVisible(true);
  }
  function showUserModal(projectId: string) {
    setselectedProjectId(projectId);
    setIsUserModalVisible(true);
  }
  function showEditProjectModal(projectId: string) {
    setselectedProjectId(projectId);
    setIsEditProjectModalVisible(true);
  }

  // component logic functions
  function handleRemoveProject(projectId: string) {
    removeProject({
      variables: {
        id: projectId,
      },
      update: (cache) => {
        const projects: any = cache.readQuery({
          query: GET_PROJECTS,
        });
        const newProjects = projects.allProjects.filter(
          (project: Project) => project.id !== projectId
        );
        cache.writeQuery({
          query: GET_PROJECTS,
          data: { allProjects: { newProjects } },
        });
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
            <PlusOutlined onClick={showAddProjectModal} />
          </div>,
        ]}
        className="ProjectList"
        itemLayout="horizontal"
        dataSource={projectsData.allProjects}
        rowKey={'id'}
        renderItem={(item: Project) => {
          return (
            <List.Item
              key={item.id}
              actions={[
                <UserSwitchOutlined onClick={() => showUserModal(item.id)} />,
                <EditOutlined onClick={() => showEditProjectModal(item.id)} />,
                <DeleteOutlined onClick={() => handleRemoveProject(item.id)} />,
              ]}
            >
              <List.Item.Meta
                key={item.id}
                title={<p key={item.id}>{item.name}</p>}
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
