import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ENTERPRISES, GET_PROJECT, UPDATE_PROJECT } from '../gql';
import { Modal, Button, Input, Select } from 'antd';
const { Option } = Select;

export function EditProjectModal(props: any) {
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  const {
    selectedProjectId,
    isEditProjectModalVisible,
    setIsEditProjectModalVisible,
  } = props;

  // api call hooks
  const {
    loading: enterprisesLoading,
    error: enterprisesError,
    data: enterprisesData,
  } = useQuery(GET_ENTERPRISES);
  const { loading: projectLoading, error: projectError } = useQuery(
    GET_PROJECT,
    {
      variables: { id: selectedProjectId },
      onCompleted: (data: any) => {
        setSelectedProjectName(data.Project.name);
        setSelectedEnterpriseId(data.Project.Enterprise.id);
      },
    }
  );
  const [
    editProject,
    { loading: projectEditLoading, error: projectEditError },
  ] = useMutation(UPDATE_PROJECT);

  // making sure fetched data is ready
  if (enterprisesLoading || projectLoading || projectEditLoading)
    return <p>Loading...</p>;
  if (enterprisesError || projectError || projectEditError) return <p>Error</p>;
  const { allEnterprises } = enterprisesData;

  // component logic functions
  function onEnterpriseChange(value: any) {
    setSelectedEnterpriseId(value);
  }
  function handleEditProject() {
    editProject({
      variables: {
        id: selectedProjectId,
        name: selectedProjectName,
        enterprise_id: selectedEnterpriseId,
      },
    });
    setIsEditProjectModalVisible(false);
  }
  function cancelEditProject() {
    setIsEditProjectModalVisible(false);
  }

  if (selectedProjectName !== '') {
    return (
      <div className="EditProjectModal">
        <Modal
          title={`Edit ${selectedProjectName}`}
          visible={isEditProjectModalVisible}
          onOk={handleEditProject}
          onCancel={cancelEditProject}
          footer={
            <Button key="submit" type="primary" onClick={handleEditProject}>
              Edit Project
            </Button>
          }
        >
          <Input
            defaultValue={selectedProjectName}
            onChange={(e: any) => setSelectedProjectName(e.target.value)}
          />
          <Select
            value={selectedEnterpriseId}
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="children"
            onChange={onEnterpriseChange}
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
  } else return null;
}
