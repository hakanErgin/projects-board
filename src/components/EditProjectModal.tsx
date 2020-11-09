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

const CREATE_PROJECT = gql`
  mutation CreateProject($id: ID!, $name: String!, $enterprise_id: ID!) {
    createProject(id: $id, name: $name, enterprise_id: $enterprise_id) {
      id
    }
  }
`;

export function EditProjectModal(props: any) {
  const { loading, error, data } = useQuery(GET_ENTERPRISES);
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');
  const [createProject] = useMutation(CREATE_PROJECT, {
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

  const { isEditProjectModalVisible, setIsEditProjectModalVisible } = props;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allEnterprises } = data;

  function onChange(value: any) {
    setSelectedEnterpriseId(value);
  }

  function handleOk() {
    createProject({
      variables: {
        id: get_random_id(),
        name: selectedProjectName,
        enterprise_id: selectedEnterpriseId,
      },
    });
    setIsEditProjectModalVisible(false);
  }

  function handleCancel(/* e: any */) {
    setIsEditProjectModalVisible(false);
  }

  return (
    <div className="EditProjectModal">
      <Modal
        title="Add Project"
        visible={isEditProjectModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button key="submit" type="primary" onClick={handleOk}>
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
