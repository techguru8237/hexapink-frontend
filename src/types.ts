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
