import React from 'react';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { allEnterprises } = data;

  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }

  return (
    <div className="ProjectModal">
      <Input
        placeholder="e.g: Spotify"
        onChange={(e) => console.log(e.target.value)}
      />
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder={allEnterprises[0].name}
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
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
