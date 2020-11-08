import React from 'react';
import { Input, Select } from 'antd';

export function ProjectModal() {
  const { Option } = Select;

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
      <Input placeholder="e.g: Spotify" />
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="lucy">Lucy</Option>
        <Option value="jack">Jack</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </div>
  );
}
