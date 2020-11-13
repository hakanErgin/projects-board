import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AutoComplete, Modal, List, Avatar, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import {
  GET_USERS,
  GET_USERS_BY_PROJECT,
  UPDATE_USER,
  GET_PROJECTS,
} from '../gql/';
import { Props, User } from '../types';
import './ModalStyles.css';
import { relative } from 'path';
const { Option } = AutoComplete;

export function UserModal(props: Props) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<string | null>(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const { isUserModalVisible, setIsUserModalVisible } = props;

  // gpl api hooks
  const {
    loading: projectUsersLoading,
    error: projectUsersError,
    data: projectUsersData,
  } = useQuery(GET_USERS_BY_PROJECT, {
    variables: { id: props.selectedProjectId },
  });
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS);
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS_BY_PROJECT,
        variables: { id: props.selectedProjectId },
      },
      {
        query: GET_PROJECTS,
      },
    ],
  });

  // making sure fetched data is ready
  if (projectUsersLoading || usersLoading) return <p>Loading...</p>;
  if (projectUsersError || usersError) return <p>Error</p>;

  // component logic functions
  function removeUser(userId: string) {
    updateUser({
      variables: { id: userId, project_id: null },
    });
  }
  function addUser(_value: string, option: any) {
    updateUser({
      variables: { id: option.key, project_id: props.selectedProjectId },
    });
  }
  function handleSearch(value: string) {
    let res: string[] = [];
    if (!value) {
      res = [];
    } else {
      res = usersData.allUsers.filter((user: User) => {
        return [user.first_name, user.last_name, user.email].some(
          (element: any) => {
            return element.toUpperCase().includes(value.toUpperCase());
          }
        );
      });
    }
    setSearchResult(res);
  }

  return (
    <div className="UserModal">
      <Modal
        className={'Modal'}
        title="Users settings"
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={
          isSearchBarVisible ? (
            <AutoComplete
              className={'autoCompleteBox'}
              onSearch={handleSearch}
              onSelect={addUser}
              suffixIcon={<UserAddOutlined />}
              placeholder="ex: firstname.lastname@provider.com"
            >
              {searchResult.map((user: any) => {
                return (
                  <Option
                    key={user.id}
                    value={`${user.first_name} ${user.last_name}`}
                  >
                    <div className={'searchOption'}>
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                      <span>{user.email}</span>
                    </div>
                  </Option>
                );
              })}
              {/* <Input
                
                suffix={<UserAddOutlined />}
              /> */}
            </AutoComplete>
          ) : (
            <p
              className={'inviteText'}
              onClick={() => setIsSearchBarVisible(true)}
            >
              Invite new users
            </p>
          )
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={projectUsersData.Project.Users}
          renderItem={(item: User, index: any) => {
            return (
              <List.Item
                onMouseEnter={() => setHoveredItemIndex(index)}
                onMouseLeave={() => setHoveredItemIndex(null)}
                actions={[
                  hoveredItemIndex === index && (
                    <a href="/#" onClick={() => removeUser(item.id)}>
                      Delete
                    </a>
                  ),
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={`${item.first_name} ${item.last_name}`}
                  description={item.email}
                />
              </List.Item>
            );
          }}
        />
      </Modal>
    </div>
  );
}
