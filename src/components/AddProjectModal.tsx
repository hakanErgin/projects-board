import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select, Typography } from 'antd';
import { GET_ENTERPRISES, CREATE_PROJECT } from '../gql';
import { Enterprise, AddProjectModalProps } from '../types';
import './ModalStyles.css';
const { Option } = Select;
const { Text } = Typography;

export function AddProjectModal(props: AddProjectModalProps) {
  const [selectedProjectName, setSelectedProjectName] = useState<string>('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>('');

  const { isAddProjectModalVisible, setIsAddProjectModalVisible } = props;

  // gql api hooks
  const {
    loading: enterprisesLoading,
    error: enterprisesError,
    data: enterprisesData,
  } = useQuery(GET_ENTERPRISES);
  const [
    addProject,
    { loading: projectCreateLoading, error: projectCreateError },
  ] = useMutation(CREATE_PROJECT, {
    // updating cache instead of having to refetch
    update(cache, { data: { createProject } }) {
      cache.modify({
        fields: {
          allProjects(existingProjects = []) {
            const newProjectRef = cache.writeFragment({
              data: createProject,
              fragment: gql`
                fragment NewProject on Project {
                  id
                }
              `,
            });
            return [...existingProjects, newProjectRef];
          },
        },
      });
    },
  });

  if (enterprisesLoading || projectCreateLoading) return null;
  if (enterprisesError || projectCreateError) return <p>Error</p>;

  // component logic functions
  function onEnterpriseChange(value: string) {
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
        className={'Modal'}
        title="Add Project"
        visible={isAddProjectModalVisible}
        onOk={handleAddProject}
        onCancel={handleCancel}
        footer={
          <Button
            disabled={selectedProjectName === '' || selectedEnterpriseId === ''}
            key="submit"
            type="primary"
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        }
      >
        <div className={'formContainer'}>
          <Text id="projectTitle" strong>
            Project's name
          </Text>
          <Input
            className={'projectInputBox'}
            placeholder="e.g: Spotify"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedProjectName(e.target.value);
            }}
          />
        </div>
        <div className={'formContainer'}>
          <Text id="enterpriseTitle" strong>
            Enterprise
          </Text>
          <Select
            showSearch
            placeholder={'Quop'}
            optionFilterProp="children"
            onChange={onEnterpriseChange}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {enterprisesData.allEnterprises.map((enterprise: Enterprise) => {
              return (
                <Option value={enterprise.id} key={enterprise.id}>
                  {enterprise.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
