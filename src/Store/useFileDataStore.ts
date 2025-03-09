import { create } from "zustand";

interface FileData {
  id: string;
  data: any;
}

interface TableState {
  fileData: FileData[];
  setFileData: (data: FileData[]) => void;
}

const useFileDataStore = create<TableState>((set) => ({
  fileData: [],
  setFileData: (data: FileData[]) => set(() => ({ fileData: data })),
}));

export default useFileDataStore;
