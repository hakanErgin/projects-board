import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { AutoComplete, Modal, List, Avatar } from 'antd';

const { Option } = AutoComplete;

const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      email
      first_name
      last_name
    }
  }
`;

const GET_USERS_BY_PROJECT = gql`
  query($id: ID!) {
    Project(id: $id) {
      Users {
        id
        first_name
        last_name
        avatar
        email
        project_id
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation($id: ID!, $project_id: ID) {
    updateUser(id: $id, project_id: $project_id) {
      id
      project_id
    }
  }
`;

export function UserModal(props: any) {
  const { isUserModalVisible, setIsUserModalVisible } = props;
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const { loading, error, data } = useQuery(GET_USERS_BY_PROJECT, {
    variables: { id: props.selectedProjectId },
  });
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_ALL_USERS);

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USERS_BY_PROJECT,
        variables: { id: props.selectedProjectId },
      },
    ],
  });

  if (loading || usersLoading) return <p>Loading...</p>;
  if (error || usersError) return <p>Error</p>;

  function removeUser(userId: any) {
    return updateUser({
      variables: { id: userId, project_id: null },
    });
  }

  const onSelect = (_value: string, option: any) => {
    updateUser({
      variables: { id: option.key, project_id: props.selectedProjectId },
    });
  };

  const handleSearch = (value: string) => {
    let res: string[] = [];
    if (!value) {
      res = [];
    } else {
      res = usersData.allUsers.filter((user: any) =>
        [user.first_name, user.last_name, user.email].some((element) =>
          element.toUpperCase().includes(value.toUpperCase())
        )
      );
    }

    setResult(res);
  };

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
              onSelect={onSelect}
            >
              {result.map((user: any) => (
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
              ))}
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
          dataSource={data.Project.Users}
          renderItem={(item: any, index: any) => (
            <List.Item
              onMouseEnter={() => setHoveredItemIndex(index)}
              onMouseLeave={() => setHoveredItemIndex(null)}
              actions={[
                hoveredItemIndex === index && (
                  <a key="list-delete" onClick={() => removeUser(item.id)}>
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
          )}
        />
        ,
      </Modal>
    </div>
  );
}
