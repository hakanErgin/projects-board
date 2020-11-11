import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select, List, Avatar } from 'antd';
import { get_random_id } from '../helper_functions';

const { Option } = Select;

const GET_USERS = gql`
  query {
    allUsers {
      id
      first_name
      last_name
      email
      avatar
      project_id
    }
  }
`;

export function UserModal(props: any) {
  const { isUserModalVisible, setIsUserModalVisible } = props;
  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_USERS);

  return (
    <div className="UserModal">
      <Modal
        title="Add User"
        visible={isUserModalVisible}
        // onOk={handleOk}
        // onCancel={handleCancel}
        // footer={
        //   <Button key="submit" type="primary" onClick={handleOk}>
        //     Add User
        //   </Button>
        // }
      >
        <List
          itemLayout="horizontal"
          // dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                // title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        ,
      </Modal>
    </div>
  );
}
