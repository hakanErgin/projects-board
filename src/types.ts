export interface Project {
  __typename: string;
  id: string;
  name: string;
  Users: User[];
  Enterprise: Enterprise;
}

export interface User {
  __typename?: string;
  id: string;
  name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface Enterprise {
  __typename?: string;
  id: string;
  name?: string;
}

export interface OncompletedProject {
  Project: Project;
}

export interface Props {
  selectedProjectId?: string;
  isAddProjectModalVisible?: boolean;
  isEditProjectModalVisible?: boolean;
  isUserModalVisible?: boolean;
  setIsAddProjectModalVisible?: any;
  setIsEditProjectModalVisible?: any;
  setIsUserModalVisible?: any;
}
