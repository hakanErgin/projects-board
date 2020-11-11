import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select } from 'antd';
import { GET_ENTERPRISES, GET_PROJECT } from '../gql/queries';
import { UPDATE_PROJECT } from '../gql/mutations';

const { Option } = Select;

export function EditProjectModal(props: any) {
  const {
    selectedProjectId,
    isEditProjectModalVisible,
    setIsEditProjectModalVisible,
  } = props;

  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  const { loading, error, data } = useQuery(GET_ENTERPRISES);
  const { error: getProError } = useQuery(GET_PROJECT, {
    variables: { id: selectedProjectId },
    onCompleted: (data: any) => {
      setSelectedProjectName(data.Project.name);
      setSelectedEnterpriseId(data.Project.Enterprise.id);
    },
  });
  const [updateProjecct] = useMutation(UPDATE_PROJECT);

  if (loading) return <p>Loading...</p>;
  if (error || getProError) {
    return <p>Error</p>;
  }

  const { allEnterprises } = data;

  function onChange(value: any) {
    setSelectedEnterpriseId(value);
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

  if (selectedProjectName !== '') {
    return (
      <div className="EditProjectModal">
        <Modal
          title={`Edit ${selectedProjectName}`}
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
  } else return null;
}
