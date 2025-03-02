export interface TableItem {
  _id: string;
  userId: string;
  tableName: string;
  leads: number;
  tags: string[];
  columns: [string];
  data: RowData[];
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
  password?: string;
  phone?: string;
  country?: string;
  industry?: string;
  company?: string;
  role?: string;
  status?: string;
  is_verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TableListItemProps {
  data: TableItem;
  index: string;
  isSelected: boolean;
  fetchTables: () => void;
  tables: TableItem[];
  setTables: (updatedTables: TableItem[]) => void;
  onCheckboxChange: (index: string) => void;
}

export interface PreviewModalProps {
  onRequestClose: () => void;
  data: Array<RowData>; // Adjust according to your data structure
}

export interface RowData {
  [key: string]: string; // Allow any string key for dynamic data
}

export interface TagModalProps {
  tableId: string;
  oldTag: string;
  open: boolean;
  actionType: string;
  tables: TableItem[];
  setTables: (updatedTables: TableItem[]) => void;
  handleClose: () => void;
}

export interface Tag {
  name: string;
}

export interface TagOption {
  inputValue?: string;
  name: string;
}

interface mappedTable {
  tableId: string;
  tableName: string;
  tableColumn: string;
}

export interface Column {
  id: number;
  name: string;
  type: string;
  showToClient: boolean;
  isAdditionalFee: boolean;
  additionalFee?: number;
  tableColumns?: mappedTable[];
  optional?: boolean;
  stepName?: string;
}

export interface NewColumn {
  name: string;
  type: string;
  values: string[];
}

export interface Collection {
  _id: string;
  title: string;
  image?: string;
  type?: string;
  description?: string;
  countries?: string[];
  fee?: number;
  discount?: number;
  columns: Column[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Step {
  id: number;
  name: string;
}

export interface CollectionCreateErrors {
  title: string;
  file: string;
  columnMapping: string;
}

export interface BankItem {
  _id: string;
  bankName: string;
  accountOwner?: string;
  accountNumber?: string;
  iban?: string;
  rib?: string;
  swift?: string;
  bankLogo?: string;
  qrCode?: string;
  status?: string;
  createdAt: string;
}

// types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number;
  status: string;
  token: string;
}

export interface UserContextType {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export type UserRole = "admin" | "manager" | "user";

export interface Cart {
  id: string;
  title: string;
  type: string;
  countries: string[];
  collectionId: string;
  image: string;
  unitPrice: number;
  columns: Record<string, { value: any; stepName: string }>;
  volume: number;
}

export interface File {
  _id?: string;
  title: string;
  type: string;
  countries: string[];
  collectionId: string;
  image: string;
  unitPrice: number;
  volume: number;
  columns: Record<string, { value: any; stepName: string }>;
  status: string;
  createdAt?: string;
}

export interface Order {
  _id: string;
  files: File[];
  volume: number;
  prix: number;
  paid: "Paid" | "Unpaid" | "Processing";
  createdAt: string;
}

