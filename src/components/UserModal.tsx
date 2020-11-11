import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Input, Select } from 'antd';
import { get_random_id } from '../helper_functions';

const { Option } = Select;

export function UserModal(props: any) {
  const { isUserModalVisible, setIsUserModalVisible } = props;

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
      ></Modal>
    </div>
  );
}
