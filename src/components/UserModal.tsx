import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AutoComplete, Modal, List, Avatar } from 'antd';
import {
  GET_USERS,
  GET_USERS_BY_PROJECT,
  UPDATE_USER,
  GET_PROJECTS,
} from '../gql/';
import { Props, User } from '../types';
const { Option } = AutoComplete;

export function UserModal(props: Props) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
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
        title="Add User"
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={
          isSearchBarVisible ? (
            <AutoComplete
              style={{ width: '100%' }}
              placeholder="ex: firstname.lastname@provider.com"
              onSearch={handleSearch}
              onSelect={addUser}
            >
              {searchResult.map((user: any) => {
                return (
                  <Option
                    key={user.id}
                    value={`${user.first_name} ${user.last_name}`}
                  >
                    <div style={{ display: 'flex' }}>
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                      <span style={{ marginLeft: 16, color: 'grey' }}>
                        {user.email}
                      </span>
                    </div>
                  </Option>
                );
              })}
            </AutoComplete>
          ) : (
            <p
              style={{ textAlign: 'center' }}
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
            console.log({ item }, { index });

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
