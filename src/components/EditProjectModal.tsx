import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select } from 'antd';
import { get_random_id } from '../helper_functions';

const { Option } = Select;

const GET_ENTERPRISES = gql`
  query {
    allEnterprises {
      id
      name
    }
  }
`;

const GET_PROJECT = gql`
  query($id: ID!) {
    Project(id: $id) {
      id
      name
      Enterprise {
        id
        name
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation($id: ID!, $name: String!, $enterprise_id: ID!) {
    updateProject(id: $id, name: $name, enterprise_id: $enterprise_id)
    id
  }
`;

export function EditProjectModal(props: any) {
  const {
    selectedProjectId,
    isEditProjectModalVisible,
    setIsEditProjectModalVisible,
  } = props;

  const { loading, error, data } = useQuery(GET_ENTERPRISES);
  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { id: selectedProjectId },
  });
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(projectData);

  const { allEnterprises } = data;

  function onChange(value: any) {
    setSelectedEnterpriseId(value);
  }

  function handleOk() {
    setIsEditProjectModalVisible(false);
  }

  function handleCancel(/* e: any */) {
    setIsEditProjectModalVisible(false);
  }

  return (
    <div className="EditProjectModal">
      <Modal
        title="Edit Project"
        visible={isEditProjectModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button key="submit" type="primary" onClick={handleOk}>
            Edit Project
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
          placeholder={allEnterprises[0].name}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {allEnterprises.map((enterprise: any) => (
            <Option value={enterprise.id} key={enterprise.id}>
              {enterprise.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
}