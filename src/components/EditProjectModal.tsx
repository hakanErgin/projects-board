import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ENTERPRISES,
  GET_PROJECT,
  UPDATE_PROJECT,
  GET_PROJECTS,
} from '../gql';
import { Modal, Button, Input, Select, Typography } from 'antd';
import { OncompletedProject, Props, Enterprise } from '../types';
import './ModalStyles.css';
const { Text } = Typography;
const { Option } = Select;

export function EditProjectModal(props: Props) {
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>('');

  const {
    selectedProjectId,
    isEditProjectModalVisible,
    setIsEditProjectModalVisible,
  } = props;

  // gpl api hooks
  const {
    loading: enterprisesLoading,
    error: enterprisesError,
    data: enterprisesData,
  } = useQuery(GET_ENTERPRISES);
  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id: selectedProjectId },
    onCompleted: (data: OncompletedProject) => {
      setSelectedProjectName(data.Project.name);
      setSelectedEnterpriseId(data.Project.Enterprise.id);
    },
  });
  const [
    editProject,
    { loading: projectEditLoading, error: projectEditError },
  ] = useMutation(UPDATE_PROJECT);

  // making sure fetched data is ready
  if (enterprisesLoading || projectLoading || projectEditLoading) return null;
  if (enterprisesError || projectError || projectEditError) return <p>Error</p>;

  // component logic functions
  function onEnterpriseChange(value: string) {
    setSelectedEnterpriseId(value);
  }
  function handleEditProject() {
    editProject({
      variables: {
        id: selectedProjectId,
        name: selectedProjectName,
        enterprise_id: selectedEnterpriseId,
      },
      refetchQueries: [
        {
          query: GET_PROJECTS,
        },
      ],
    });
    setIsEditProjectModalVisible(false);
  }
  function cancelEditProject() {
    setIsEditProjectModalVisible(false);
  }

  // if (selectedProjectName !== '') {
  if (projectData)
    return (
      <div className="EditProjectModal">
        <Modal
          className={'Modal'}
          title={`Edit ${selectedProjectName}`}
          visible={isEditProjectModalVisible}
          onOk={handleEditProject}
          onCancel={cancelEditProject}
          footer={
            <Button
              disabled={
                selectedProjectName === '' || selectedEnterpriseId === ''
              }
              key="submit"
              type="primary"
              onClick={handleEditProject}
            >
              Edit Project
            </Button>
          }
        >
          <div className={'formContainer'}>
            <Text id="projectTitle" strong>
              Project's name
            </Text>

            <Input
              defaultValue={projectData.Project.name}
              onChange={(e: any) => setSelectedProjectName(e.target.value)}
            />
          </div>
          <div className={'formContainer'}>
            <Text id="enterpriseTitle" strong>
              Enterprise
            </Text>

            <Select
              value={selectedEnterpriseId}
              showSearch
              optionFilterProp="children"
              onChange={onEnterpriseChange}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {enterprisesData.allEnterprises.map((enterprise: Enterprise) => (
                <Option value={enterprise.id} key={enterprise.id}>
                  {enterprise.name}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    );
  else return null;
}
