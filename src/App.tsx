import React, { useState } from 'react';
import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { List } from 'antd';
import {
  UserSwitchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProjectModal } from './components/ProjectModal';
import { EditProjectModal } from './components/EditProjectModal';
import { GET_PROJECT } from './components/EditProjectModal';

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

const REMOVE_PROJECT = gql`
  mutation($id: ID!) {
    removeProject(id: $id)
  }
`;

function App() {
  const client = useApolloClient();
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(REMOVE_PROJECT);

  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
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
  // console.log('a', allProjects);

  function showModal() {
    setIsProjectModalVisible(true);
  }
  function showEditProjectModal(project_id: any) {
    setselectedProjectId(project_id);
    setIsEditProjectModalVisible(true);
  }
  function removeProject(id: any) {
    deleteProject({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_PROJECTS }],
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
              <UserSwitchOutlined />,
              <EditOutlined onClick={() => showEditProjectModal(item.id)} />,
              <DeleteOutlined onClick={() => removeProject(item.id)} />,
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
