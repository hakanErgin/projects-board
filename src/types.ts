import React, { SetStateAction } from 'react';

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

export interface UserModalProps {
  selectedProjectId: string;
  isUserModalVisible: boolean;
  setIsUserModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

export interface AddProjectModalProps {
  isAddProjectModalVisible: boolean;
  setIsAddProjectModalVisible: React.Dispatch<SetStateAction<boolean>>;
}
export interface EditProjectModalProps {
  selectedProjectId: string;
  isEditProjectModalVisible: boolean;
  setIsEditProjectModalVisible: React.Dispatch<SetStateAction<boolean>>;
}
