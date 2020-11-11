import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { List } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProjectModal } from './components/ProjectModal';
import { EditProjectModal } from './components/EditProjectModal';
import { UserModal } from './components/UserModal';

import './App.css';

const GET_PROJECTS = gql`
  query {
    allProjects {
      id
      name
      enterprise_id
      Users {
        id
        first_name
        last_name
        email
        avatar
      }
    }
  }
`;

const REMOVE_PROJECT = gql`
  mutation($id: ID!) {
    removeProject(id: $id)
  }
`;

function App() {
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(REMOVE_PROJECT);

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
  function showUserModal() {
    setIsUserModalVisible(true);
  }
  function showEditProjectModal(project_id: any) {
    setselectedProjectId(project_id);
    setIsEditProjectModalVisible(true);
  }
  function removeProject(project_id: any) {
    console.log({ project_id });

    deleteProject({
      variables: {
        id: project_id,
      },
      update: (cache) => {
        const projects: any = cache.readQuery({
          query: GET_PROJECTS,
        });
        const newProjects = projects.allProjects.filter(
          (project: any) => project.id !== project_id
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
      {isProjectModalVisible && (
        <ProjectModal
          isProjectModalVisible={isProjectModalVisible}
          setIsProjectModalVisible={setIsProjectModalVisible}
        />
      )}
      {isUserModalVisible && (
        <UserModal
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
        // rowKey={(item) => item.id}
        renderItem={(item: any, index: any) => (
          <List.Item
            actions={[
              <UserSwitchOutlined onClick={() => showUserModal()} />,
              <EditOutlined onClick={() => showEditProjectModal(item.id)} />,
              <DeleteOutlined onClick={() => removeProject(item.id)} />,
            ]}
          >
            <List.Item.Meta
              title={
                <p>
                  {item.name}- {item.id}
                </p>
              }
              description={item.Users.length + ' collobrators'}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
