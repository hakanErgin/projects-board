import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select } from 'antd';

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
  mutation($id: ID!, $name: String, $enterprise_id: ID) {
    updateProject(id: $id, name: $name, enterprise_id: $enterprise_id) {
      id
      name
      enterprise_id
    }
  }
`;

export function EditProjectModal(props: any) {
  const {
    selectedProjectId,
    isEditProjectModalVisible,
    setIsEditProjectModalVisible,
  } = props;

  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  const { loading, error, data } = useQuery(GET_ENTERPRISES);
  const { data: projectData, error: getProError } = useQuery(GET_PROJECT, {
    variables: { id: selectedProjectId },
    onCompleted: (data: any) => {
      setSelectedProjectName(data.Project.name);
      setSelectedEnterpriseId(data.Project.Enterprise.id);
    },
  });
  const [
    updateProjecct,
    { data: updateData, error: updateError },
  ] = useMutation(UPDATE_PROJECT);

  if (loading) return <p>Loading...</p>;
  if (error || updateError || getProError) {
    console.log('error');
    return <p>Error</p>;
  }
  // console.log(projectData);

  const { allEnterprises } = data;

  function onChange(value: any) {
    setSelectedEnterpriseId(value);
    console.log(value);
  }

  function handleOk() {
    updateProjecct({
      variables: {
        id: selectedProjectId,
        name: selectedProjectName,
        enterprise_id: selectedEnterpriseId,
      },
    });
    setIsEditProjectModalVisible(false);
  }

  function handleCancel(/* e: any */) {
    setIsEditProjectModalVisible(false);
  }
  // console.log(projectData.Project.Enterprise.Id);

  if (selectedProjectName !== '')
    return (
      <div className="EditProjectModal">
        <Modal
          // destroyOnClose={true}
          // title="edit project"
          title={`Edit ${projectData.Project.name}`}
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
            defaultValue={selectedProjectName}
            onChange={(e: any) => setSelectedProjectName(e.target.value)}
          />
          <Select
            // defaultValue={projectData.Project.Enterprise.Id}
            value={selectedEnterpriseId}
            showSearch
            style={{ width: '100%' }}
            // placeholder={allEnterprises[0].name}
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
  else return null;
}
