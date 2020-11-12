import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Modal, Button, Input, Select } from 'antd';
import { GET_ENTERPRISES, CREATE_PROJECT, GET_PROJECTS } from '../gql';
const { Option } = Select;

export function AddProjectModal(props: any) {
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  const { isAddProjectModalVisible, setIsAddProjectModalVisible } = props;

  // gpl api hooks
  const {
    loading: enterprisesLoading,
    error: enterprisesError,
    data: enterprisesData,
  } = useQuery(GET_ENTERPRISES);
  const [
    addProject,
    { loading: projectCreateLoading, error: projectCreateError },
  ] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (enterprisesLoading || projectCreateLoading) return <p>Loading...</p>;
  if (enterprisesError || projectCreateError) return <p>Error</p>;

  // component logic functions
  function onEnterpriseChange(value: any) {
    setSelectedEnterpriseId(value);
  }
  function handleAddProject() {
    addProject({
      variables: {
        // mocking a unique id
        id: Date.now(),
        name: selectedProjectName,
        enterprise_id: selectedEnterpriseId,
      },
    });
    setIsAddProjectModalVisible(false);
  }
  function handleCancel() {
    setIsAddProjectModalVisible(false);
  }

  return (
    <div className="AddProjectModal">
      <Modal
        title="Add Project"
        visible={isAddProjectModalVisible}
        onOk={handleAddProject}
        onCancel={handleCancel}
        footer={
          <Button key="submit" type="primary" onClick={handleAddProject}>
            Add Project
          </Button>
        }
      >
        <Input
          placeholder="e.g: Spotify"
          onChange={(e: any) => setSelectedProjectName(e.target.value)}
        />
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder={'Quop'}
          optionFilterProp="children"
          onChange={onEnterpriseChange}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {enterprisesData.allEnterprises.map((enterprise: any) => (
            <Option value={enterprise.id} key={enterprise.id}>
              {enterprise.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
}
