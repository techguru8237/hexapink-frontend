export interface TableItem {
  _id: string;
  userId: string;
  tableName: string;
  leads: number;
  columns: [string];
  data: [object];
  createdAt: string;
  updatedAt: string;
}

export interface NewUserItem {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string | undefined;
  country: string;
}

export interface UserItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TableListItemProps {
  data: TableItem;
  index: string;
  isSelected: boolean;
  onCheckboxChange: (index: string) => void;
  fetchTables: () => void;
}

export interface PreviewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: Array<object>; // Adjust according to your data structure
}