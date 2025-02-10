import { toast } from "react-toastify";
import api, { formApi } from "./api";

export const createTable = async (fileData: FormData, onSuccess: () => void) => {
  try {
    const response = await formApi.post("/api/table/create", fileData);
    onSuccess()
    console.log("response.data", response.data);
    toast.success("Successfully created table.")
  } catch (error: any) {
    console.error("Error verifying email:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      toast.error("Error: Unable to verify email. Please try again.");
    }
  }
};

export const updateTableName = async (
  tableId: string,
  updatedData: { tableName: string },
  onSuccess: () => void
) => {
  console.log('tableId, updatedData', tableId, updatedData)
  try {
    const response = await api.put(`/api/table/update/${tableId}`, updatedData);
    onSuccess(); // Call the success callback
    console.log("Table updated successfully:", response.data);
  } catch (error: any) {
    console.error("Error updating table name:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: Unable to update table name. Please try again.");
    }
  }
};

export const deleteTableById = async (id: string, onSuccess: () => void) => {
  try {
    await api.delete(`/api/table/delete/${id}`);

    onSuccess();
  } catch (error: any) {
    console.error("Error deleting table:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to delete table. Please try again.");
    }
  }
};

