import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Input, Select } from 'antd';

const { Option } = Select;
const enterprises = gql`
  query {
    allEnterprises {
      id
      name
    }
  }
`;

export function ProjectModal() {
  const { loading, error, data } = useQuery(enterprises);
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allEnterprises } = data;

  function onChange(value: any) {
    setSelectedEnterpriseId(value);
  }

  return (
    <div className="ProjectModal">
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
          <Option value={enterprise.id}>{enterprise.name}</Option>
        ))}
      </Select>
    </div>
  );
}
