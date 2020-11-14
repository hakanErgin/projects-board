import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AutoComplete, Modal, List, Avatar } from 'antd';
import {
  GET_USERS,
  GET_USERS_BY_PROJECT,
  UPDATE_USER,
  GET_PROJECTS,
} from '../gql/';
import { UserModalProps, User } from '../types';
import './ModalStyles.css';
const { Option } = AutoComplete;

export function UserModal(props: UserModalProps) {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<string | null>(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const { isUserModalVisible, setIsUserModalVisible } = props;

  // gql api hooks
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
  if (projectUsersLoading || usersLoading) return null;
  if (projectUsersError || usersError) return <p>Error</p>;

  // component logic functions
  const availableUsers = () => {
    const { allUsers } = usersData;
    const collobratingUsersIds = projectUsersData.Project.Users.map(
      (user: User) => user.id
    );
    // eslint-disable-next-line array-callback-return
    return allUsers.filter((user: User) => {
      if (!collobratingUsersIds.includes(user.id)) return user;
    });
  };
  function handleSearch(value: string) {
    let res: string[] = [];
    if (!value) {
      res = [];
    } else {
      res = availableUsers().filter((user: User) => {
        return [user.first_name, user.last_name, user.email].some(
          (element: any) => {
            return element.toUpperCase().includes(value.toUpperCase());
          }
        );
      });
    }
    setSearchResult(res);
  }

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
              allowClear={true}
              autoFocus={true}
              className={'autoCompleteBox'}
              onChange={handleSearch}
              onSelect={addUser}
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
